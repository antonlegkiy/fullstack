import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  spinner = false;
  private postSub: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.spinner = true;
    this.postSub = this.postsService.getPostsUpdatedList()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.spinner = false;
      });
  }

  onDeletePost(id) {
    this.postsService.deletePost(id);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
