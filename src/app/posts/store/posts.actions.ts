import { createAction, props } from '@ngrx/store';
import { PaginatedPosts } from '../models/paginated-posts.model';
import { Post } from '../models/post.model';

export enum PostsActionType {
  GET_PAGINATED_POSTS = '[Posts API] Get Paginated Posts',
  POSTS_FETCH_API_SUCCESS = '[Posts API] Get Posts Success',
  ADD_POST = '[Posts API] Add Post',
  ADD_POST_API_SUCCESS = '[Posts API] Add Post Success',

  GET_ALL_POSTS = '[Posts API] Get All Posts',
}

export const getPaginatedPosts = createAction(
  PostsActionType.GET_PAGINATED_POSTS,
  props<{ page: number; search?: string }>()
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
