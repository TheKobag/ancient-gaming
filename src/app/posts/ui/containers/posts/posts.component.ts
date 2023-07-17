import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getAllPosts, getPaginatedPosts } from 'src/app/posts/store/posts.actions';
import { selectPosts } from 'src/app/posts/store/posts.selector';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { Observable, map } from 'rxjs';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PostSkeletonComponent } from '../../components/post-skeleton/post-skeleton.component';
import { SearchInputComponent } from 'src/app/search-input/search-input.component';
import { PostStoreService } from 'src/app/posts/store/posts-store.service';

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
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  store = inject(Store);
  postStoreService = inject(PostStoreService);

  vm$: Observable<any> = this.store.pipe(select(selectPosts));

  ngOnInit(): void {
    // this.store.dispatch(getPaginatedPosts({ page: 1 }));
    this.store.dispatch(getAllPosts());
    // this.postStoreService.loadPosts();

    this.vm$.subscribe((res) => {
      console.log("RES", res);
      
    })
  }

  goToPage(page: number): void {
    // this.store.dispatch(getPaginatedPosts({ page: page }));
  }

  onSearchSubmitted(search: string): void {
    // this.store.dispatch(getPaginatedPosts({ page: 1, search: search }));
  }
}
