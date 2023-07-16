import { createFeatureSelector } from '@ngrx/store';
import { PaginatedPosts } from '../models/paginated-posts.model';

export const selectPosts = createFeatureSelector<PaginatedPosts>('posts');
