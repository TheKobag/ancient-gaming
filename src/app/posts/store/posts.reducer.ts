import { createReducer, on } from '@ngrx/store';
import { PaginatedPosts } from '../models/paginated-posts.model';
import {
  addPost,
  deletePostAPISucess,
  getAllPosts,
  postsFetchAPISuccess,
  saveNewPostAPISucess,
  updatePostAPISucess,
} from './posts.actions';
import { Post } from '../models/post.model';

// export const initialState: PaginatedPosts = {
//   data: [],
//   meta: {
//     totalCount: 0,
//     page: 1,
//     lastPage: 1,
//   },
// };

export interface Posts {
  list: Post[];
  // page
}

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [],
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
      console.log(post, id);
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
