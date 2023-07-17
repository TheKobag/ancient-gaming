import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { PostsService } from '../data/services/posts.service';
import {
  addPost,
  deletePostAPISucess,
  getAllPosts,
  getPaginatedPosts,
  paginatedPostsFetchAPISuccess,
  postsFetchAPISuccess,
  removePost,
  saveNewPostAPISucess,
  updatePost,
  updatePostAPISucess,
} from './posts.actions';
import { selectPosts } from './posts.selector';

@Injectable()
export class PostsEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private postsService: PostsService
  ) {}

  getPaginatedPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPaginatedPosts),
      withLatestFrom(this.store.pipe(select(selectPosts))),
      mergeMap(([action]) => {
        return this.postsService
          .getPaginatedPosts(action.page, 10, action.search)
          .pipe(
            map((data) =>
              paginatedPostsFetchAPISuccess({ paginatedPosts: data })
            )
          );
      })
    )
  );

  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllPosts),
      withLatestFrom(this.store.pipe(select(selectPosts))),
      mergeMap(([, postsfromStore]) => {
        if (postsfromStore.posts.length > 0) {
          return EMPTY;
        }
        return this.postsService.getAllPosts().pipe(
          map((posts) => {
            return postsFetchAPISuccess({ posts: posts });
          })
        );
      })
    )
  );

  saveNewPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      switchMap((action) =>
        this.postsService.addPost(action.newPost).pipe(
          map((newPost) => {
            return saveNewPostAPISucess({ newPost: newPost });
          })
        )
      )
    );
  });

  removePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removePost),
      switchMap((action) =>
        this.postsService.removePost(action.id).pipe(
          map((id) => {
            return deletePostAPISucess({ id: action.id });
          })
        )
      )
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) =>
        this.postsService.updatePost(action.newPost).pipe(
          map((id) => {
            return updatePostAPISucess({ newPost: action.newPost });
          })
        )
      )
    );
  });
}
