import { createReducer, on } from '@ngrx/store';
import { Post } from '../models/post.model';
import {
  addPost,
  deletePostAPISucess,
  getAllPosts,
  paginatedPostsFetchAPISuccess,
  postsFetchAPISuccess,
  saveNewPostAPISucess,
  updatePostAPISucess,
} from './posts.actions';

export interface PostsState {
  posts: Post[];
  meta: {
    totalCount: number;
    page: number;
    lastPage: number;
  };
}

export const initialState: PostsState = {
  posts: [],
  meta: {
    totalCount: 0,
    page: 1,
    lastPage: 1,
  },
};

export const postReducer = createReducer(
  initialState,
  on(getAllPosts, (state) => state),
  on(postsFetchAPISuccess, (state, { posts }) => {
    return {
      ...state,
      posts,
    };
  }),
  on(paginatedPostsFetchAPISuccess, (state, { paginatedPosts }) => {
    return {
      ...state,
      posts: paginatedPosts.data,
      meta: {
        lastPage: paginatedPosts.meta.lastPage,
        page: paginatedPosts.meta.page,
        totalCount: paginatedPosts.meta.totalCount,
        search: paginatedPosts.meta.search,
      },
    };
  }),
  on(addPost, (state) => state),
  on(saveNewPostAPISucess, (state, { newPost }) => {
    const posts: Array<Post> = { ...state }.posts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    })) as Post[];

    posts.push({
      id: newPost.id,
      title: newPost.title,
      body: newPost.body,
    });
    return {
      ...state,
      posts,
    };
  }),
  on(deletePostAPISucess, (state, { id }) => {
    const posts: Array<Post> = { ...state }.posts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    })) as Post[];

    posts.forEach((post, index) => {
      if (post.id === id) {
        posts.splice(index, 1);
      }
    });
    return {
      ...state,
      posts,
    };
  }),
  on(updatePostAPISucess, (state, { newPost }) => {
    const posts: Array<Post> = { ...state }.posts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    })) as Post[];

    posts.forEach((post, index) => {
      if (post.id === newPost.id) {
        posts[index] = newPost;
      }
    });
    return {
      ...state,
      posts,
    };
  })
);
