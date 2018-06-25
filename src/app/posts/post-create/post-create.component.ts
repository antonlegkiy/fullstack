import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService) { }

  ngOnInit() {
  }

  onAddedPost(form: NgForm) {
    if (form.valid) {
      const post: Post = {
        title: form.value.title,
        content: form.value.content
      };
      this.postsService.addPost(post);
      form.resetForm();
    }
  }

}