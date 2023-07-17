import { createAction, props } from '@ngrx/store';
import { PaginatedPosts } from '../models/paginated-posts.model';

export enum PostsActionType {
  GET_PAGINATED_POSTS = '[Posts API] Get Paginated Posts',
  POSTS_FETCH_API_SUCCESS = '[Posts API] Get Posts Success',
}

export const getPaginatedPosts = createAction(
  PostsActionType.GET_PAGINATED_POSTS,
  props<{ page: number, search?: string }>()
);

export const postsFetchAPISuccess = createAction(
  PostsActionType.POSTS_FETCH_API_SUCCESS,
  props<{ paginatedPosts: PaginatedPosts }>()
);
