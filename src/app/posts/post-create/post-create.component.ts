import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post: Post;
  spinner = false;
  private mode = 'create';
  private postID: string;

  constructor(public postsService: PostsService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.spinner = true;
        this.postsService.getPost(this.postID).subscribe(data => {
          this.post = {
            id: data._id,
            title: data.title,
            content: data.content
          };
          this.spinner = false;
        });
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onAddedPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const post: Post = {
      id: this.postID ? this.postID : null,
      title: form.value.title,
      content: form.value.content
    };

    this.spinner = true;
    if (this.mode === 'create') {
      this.postsService.addPost(post);
    }
    if (this.mode === 'edit') {
      this.postsService.updatePost(this.post.id, post);
    }
    form.resetForm();
  }

}
