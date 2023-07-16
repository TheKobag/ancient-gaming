import { createFeatureSelector } from '@ngrx/store';
import { Post } from '../models/post.model';
 
export const selectPosts = createFeatureSelector<Post[]>('posts');