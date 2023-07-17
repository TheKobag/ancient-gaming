import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../models/post.model';
import * as PostActions from './posts.actions';

@Injectable({
  providedIn: 'root',
})
export class PostStoreService {
  constructor(private store: Store<Post>) {}

  public loadPosts() {
    this.store.dispatch(PostActions.getAllPosts());
  }

//   public addPost(newPost: Post) {
//     this.store.dispatch(
//       PostActions.addPost({
//         newPost: { ...newPost },
//       })
//     );
//   }
}
