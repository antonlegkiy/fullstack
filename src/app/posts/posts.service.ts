import { Subject } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postsCounter: number}>();

  constructor (private http: HttpClient,
               private router: Router) {}

  getPosts(postPerPage: number, currentPage: number) {
    const params = new HttpParams()
      .set('size', postPerPage.toString())
      .set('page', currentPage.toString());
    this.http.get<{posts: Post[], totalPosts: number}>('http://localhost:3000/api/posts', { params: params })
      .pipe(map((postData => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post['_id'],
              imagePath: post.imagePath
            };
          }),
          totalPosts: postData.totalPosts
        };
      })))
      .subscribe((result) => {
        this.posts = result.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postsCounter: result.totalPosts
        });
      });
  }

  getPost(id) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(`http://localhost:3000/api/posts/${id}`);
  }

  getPostsUpdatedList() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post, image) {
    const data = new FormData();
    data.append('title', post.title);
    data.append('content', post.content);
    data.append('postImage', image, post.title);
    this.http.post<Post>('http://localhost:3000/api/posts', data)
      .subscribe(result => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, post: Post, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('postImage', image, post.title);
    } else {
      postData = post;
    }
    this.http.put<{message: string}>(`http://localhost:3000/api/posts/${id}`, postData)
      .subscribe(data => {
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    return this.http.delete<{message: string}>(`http://localhost:3000/api/posts/${id}`);
  }
}
