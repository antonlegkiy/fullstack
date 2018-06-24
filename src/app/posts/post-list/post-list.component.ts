import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   { title: 'First post', content: 'first post content' },
  //   { title: 'Second post', content: 'second post content' },
  //   { title: 'Third post', content: 'third post content' }
  // ];
  @Input() posts = [];

  constructor() { }

  ngOnInit() {
  }

}
