import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from './post.model';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor (private http: HttpClient) {}

  getPosts() {
    this.http.get<Post[]>('http://localhost:3000/api/posts')
      .subscribe((response) => {
        this.posts = response;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdatedList() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((data) => {
        console.log(data.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
