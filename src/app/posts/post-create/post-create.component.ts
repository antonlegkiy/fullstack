import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { mimeTypeValidation } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post: Post;
  form: FormGroup;
  picPreview: string;
  spinner = false;
  private mode = 'create';
  private postID: string;

  constructor(public postsService: PostsService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeTypeValidation] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.spinner = true;
        this.postsService.getPost(this.postID).subscribe(data => {
          this.post = {
            id: data._id,
            title: data.title,
            content: data.content,
            imagePath: data.imagePath
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
          this.spinner = false;
        });
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onAddedPost() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      id: this.postID ? this.postID : null,
      title: this.form.value.title,
      content: this.form.value.content,
      imagePath: this.form.value.image ? this.form.value.image : null
    };

    this.spinner = true;
    if (this.mode === 'create') {
      this.postsService.addPost(post, this.form.value.image);
    }
    if (this.mode === 'edit') {
      this.postsService.updatePost(this.post.id, post, this.form.value.image);
    }
    this.form.reset();
  }

  onChoosePic(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.picPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
