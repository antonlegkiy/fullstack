import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredValue = {
    title: '',
    content: ''
  };
  @Output() postCreated = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAddedPost() {
    this.postCreated.emit(this.enteredValue);
  }

}
