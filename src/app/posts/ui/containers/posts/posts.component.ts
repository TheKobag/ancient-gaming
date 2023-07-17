import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/posts/models/post.model';
import {
  getAllPosts,
  getPaginatedPosts,
  removePost,
} from 'src/app/posts/store/posts.actions';
import { selectPosts } from 'src/app/posts/store/posts.selector';
import { SearchInputComponent } from 'src/app/search-input/search-input.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { PostSkeletonComponent } from '../../components/post-skeleton/post-skeleton.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    PostListComponent,
    PaginationComponent,
    PostSkeletonComponent,
    SearchInputComponent,
  ],
  templateUrl: './posts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);

  vm$: Observable<any> = this.store.pipe(select(selectPosts));

  search = '';

  ngOnInit(): void {
    this.store.dispatch(getAllPosts());
  }

  goToPage(page: number): void {
    this.store.dispatch(getPaginatedPosts({ page: page, search: this.search }));
  }

  onSearchSubmitted(search: string): void {
    this.search = search;
    this.store.dispatch(getPaginatedPosts({ page: 1, search: search }));
  }

  onRemovePost(id: string): void {
    this.store.dispatch(removePost({ id }));
  }

  onUpdatePost(post: Post): void {
    this.router.navigate(['posts/update'], {
      state: { newPost: post },
    });
  }
}
