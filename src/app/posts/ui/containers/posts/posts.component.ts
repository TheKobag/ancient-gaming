import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getPaginatedPosts } from 'src/app/posts/store/posts.actions';
import { selectPosts } from 'src/app/posts/store/posts.selector';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { Observable, map } from 'rxjs';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PostSkeletonComponent } from '../../components/post-skeleton/post-skeleton.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    PostListComponent,
    PaginationComponent,
    PostSkeletonComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  store = inject(Store);

  vm$: Observable<any> = this.store.pipe(select(selectPosts));

  ngOnInit(): void {
    this.store.dispatch(getPaginatedPosts({ page: 1 }));
  }

  goToPage(page: number) {
    this.store.dispatch(getPaginatedPosts({ page: page }));
  }
}
