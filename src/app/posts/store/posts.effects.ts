import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { PostsService } from '../data/services/posts.service';
import { getPaginatedPosts, postsFetchAPISuccess } from './posts.actions';
import { selectPosts } from './posts.selector';

@Injectable()
export class PostsEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private postsService: PostsService
  ) {}

  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPaginatedPosts),
      withLatestFrom(this.store.pipe(select(selectPosts))),
      mergeMap(([action, postsfromStore]) => {
        if (
          postsfromStore.data.length > 0 &&
          action.page === postsfromStore.meta.page
        ) {
          return EMPTY;
        }
        return this.postsService
          .getPaginatedPosts(action.page)
          .pipe(map((data) => postsFetchAPISuccess({ paginatedPosts: data })));
      })
    )
  );
}
