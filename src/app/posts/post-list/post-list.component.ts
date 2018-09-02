import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeList = [1, 2, 5, 10];
  spinner = false;
  private postSub: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.spinner = true;
    this.postSub = this.postsService.getPostsUpdatedList()
      .subscribe((postsData: {posts: Post[], postsCounter: number}) => {
        this.posts = postsData.posts;
        this.totalPosts = postsData.postsCounter;
        this.spinner = false;
      });
  }

  onDeletePost(id) {
    this.spinner = true;
    this.postsService.deletePost(id).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.spinner = true;
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
