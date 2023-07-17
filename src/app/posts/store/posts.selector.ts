import { createFeatureSelector } from '@ngrx/store';
import { PaginatedPosts } from '../models/paginated-posts.model';
import { Post } from '../models/post.model';
import { PostsState } from './posts.reducer';

export const selectPosts = createFeatureSelector<PostsState>('posts');
