import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/posts/models/post.model';
import { PostComponent } from '../post/post.component';
import { PostSkeletonComponent } from '../post-skeleton/post-skeleton.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    PostComponent,
    PostSkeletonComponent,
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  @Input() posts: Array<Post> = [];
  // @Output() onGoToPageClick = new EventEmitter<number>();

  // goToPage(page: number) {
  //   this.onGoToPageClick.emit(page)
  // }
}
