import { createReducer, on } from '@ngrx/store';
import { PaginatedPosts } from '../models/paginated-posts.model';
import { postsFetchAPISuccess } from './posts.actions';

export const initialState: PaginatedPosts = {
  data: [],
  meta: {
    totalCount: 0,
    page: 1,
    lastPage: 1,
  },
};

export const postReducer = createReducer(
  initialState,
  on(postsFetchAPISuccess, (state, { paginatedPosts }) => {
    return paginatedPosts;
  })
);
