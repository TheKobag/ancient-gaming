import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Post } from 'src/app/posts/models/post.model';
import { PostSkeletonComponent } from '../post-skeleton/post-skeleton.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostComponent, PostSkeletonComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  @Input() posts: Array<Post> = [];
}
