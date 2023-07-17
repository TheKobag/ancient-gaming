import { createFeatureSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const selectPosts = createFeatureSelector<PostsState>('posts');
