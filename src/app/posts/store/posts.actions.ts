import { createAction, props } from '@ngrx/store';
import { PaginatedPosts } from '../models/paginated-posts.model';
import { Post } from '../models/post.model';

export enum PostsActionType {
  GET_PAGINATED_POSTS = '[Posts API] Get Paginated Posts',
  PAGINATED_POSTS_FETCH_API_SUCCESS = '[Posts API] Get Paginated Posts Success',

  GET_ALL_POSTS = '[Posts API] Get All Posts',
  POSTS_FETCH_API_SUCCESS = '[Posts API] Get Posts Success',
  ADD_POST = '[Posts API] Add Post',
  ADD_POST_API_SUCCESS = '[Posts API] Add Post Success',
  REMOVE_POST = '[Posts API] Remove Post',
  DELETE_POST_API_SUCCESS = '[Posts API] Delete Post Success',
  UPDATE_POST = '[Posts API] Update Post',
  UPDATE_POST_API_SUCCESS = '[Posts API] Update Post Success',
}

export const getPaginatedPosts = createAction(
  PostsActionType.GET_PAGINATED_POSTS,
  props<{ page: number; search?: string }>()
);

export const paginatedPostsFetchAPISuccess = createAction(
  PostsActionType.PAGINATED_POSTS_FETCH_API_SUCCESS,
  props<{ paginatedPosts: PaginatedPosts }>()
);

export const getAllPosts = createAction(PostsActionType.GET_ALL_POSTS);

export const postsFetchAPISuccess = createAction(
  PostsActionType.POSTS_FETCH_API_SUCCESS,
  props<{ posts: Post[] }>()
);

export const addPost = createAction(
  PostsActionType.ADD_POST,
  props<{ newPost: Post }>()
);
export const saveNewPostAPISucess = createAction(
  PostsActionType.ADD_POST_API_SUCCESS,
  props<{ newPost: Post }>()
);

export const removePost = createAction(
  PostsActionType.REMOVE_POST,
  props<{ id: string }>()
);
export const deletePostAPISucess = createAction(
  PostsActionType.DELETE_POST_API_SUCCESS,
  props<{ id: string }>()
);

export const updatePost = createAction(
  PostsActionType.UPDATE_POST,
  props<{ newPost: Post }>()
);
export const updatePostAPISucess = createAction(
  PostsActionType.UPDATE_POST_API_SUCCESS,
  props<{ newPost: Post }>()
);
