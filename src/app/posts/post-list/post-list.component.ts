import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First post', content: 'first post content' },
  //   { title: 'Second post', content: 'second post content' },
  //   { title: 'Third post', content: 'third post content' }
  // ];
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostsUpdatedList()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDeletePost(id) {
    this.postsService.deletePost(id);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
