import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { PostsService } from '../data/services/posts.service';
import {
  addPost,
  deletePostAPISucess,
  getAllPosts,
  getPaginatedPosts,
  postsFetchAPISuccess,
  removePost,
  saveNewPostAPISucess,
  updatePost,
  updatePostAPISucess,
} from './posts.actions';
import { selectPosts } from './posts.selector';
import { PostStoreService } from './posts-store.service';

@Injectable()
export class PostsEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private postsService: PostsService,
    private postStoreService: PostStoreService
  ) {}

  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllPosts),
      withLatestFrom(this.store.pipe(select(selectPosts))),
      mergeMap(([action, postsfromStore]) => {
        // postsfromStore find page
        if (postsfromStore.posts.length > 0) {
          return EMPTY;
        }
        // if (
        //   postsfromStore.data.length > 0 &&
        //   action.page === postsfromStore.meta.page &&
        //   action.search === postsfromStore.meta.search
        // ) {
        //   return EMPTY;
        // }
        // return this.postsService
        //   .getPaginatedPosts(action.page, 10, action.search)
        //   .pipe(map((data) => postsFetchAPISuccess({ paginatedPosts: data })));
        return this.postsService.getAllPosts().pipe(
          map((posts) => {
            console.log(posts);
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
