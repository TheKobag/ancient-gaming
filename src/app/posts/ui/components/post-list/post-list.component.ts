import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Post } from 'src/app/posts/models/post.model';
import { PostSkeletonComponent } from '../post-skeleton/post-skeleton.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostComponent, PostSkeletonComponent],
  templateUrl: './post-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  @Input() posts: Array<Post> = [];
  @Output() removePost = new EventEmitter<string>();
  @Output() updatePost = new EventEmitter<Post>();
}
