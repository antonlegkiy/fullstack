import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor (private http: HttpClient) {}

  getPosts() {
    this.http.get<Post[]>('http://localhost:3000/api/posts')
      .pipe(map((postData => {
        return postData.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post['_id']
          };
        });
      })))
      .subscribe((result) => {
        this.posts = result;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id) {
    return this.http.get<{ _id: string, title: string, content: string }>(`http://localhost:3000/api/posts/${id}`);
  }

  getPostsUpdatedList() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http.post<{id: string}>('http://localhost:3000/api/posts', post)
      .subscribe(data => {
        post.id = data.id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, post: Post) {
    this.http.put<{message: string}>(`http://localhost:3000/api/posts/${id}`, post)
      .subscribe(data => {
        console.log(data);
      });
  }

  deletePost(id: string) {
    this.http.delete<{message: string}>(`http://localhost:3000/api/posts/${id}`)
      .subscribe(data => {
        console.log(data.message);
        this.posts = this.posts.filter(post => post.id !== id);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
