import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/posts/models/post.model';
import { PostStoreService } from 'src/app/posts/store/posts-store.service';
import { addPost, updatePost } from 'src/app/posts/store/posts.actions';
import { PostFormComponent } from '../../components/post-form/post-form.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, PostFormComponent],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent {
  postForm!: FormGroup;
  isUpdate = false;

  post: Post = {
    id: '0',
    title: '',
    body: '',
  };

  constructor(
    private fb: FormBuilder,
    private postStoreService: PostStoreService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;

    if (state) {
      console.log(state['newPost']);
      this.post = state['newPost'];
      this.isUpdate = true;
    }

    this.postForm = this.fb.group({
      title: new FormControl(this.post.title, Validators.required),
      body: new FormControl(this.post.body, Validators.required),
    });
  }

  store = inject(Store);
  router = inject(Router);

  onSubmitForm(submit: boolean): void {
    if (submit) {
      console.log(this.postForm);
      console.log(this.isUpdate);
      if (this.isUpdate) {
        this.store.dispatch(
          updatePost({ newPost: { id: this.post.id, ...this.postForm.value } })
        );
      } else {
        // update store
        this.store.dispatch(
          addPost({
            newPost: this.postForm.value,
          })
        );
      }
      // this.postStoreService.addPost(this.postForm.value);
      this.router.navigate(['posts']);
    }
  }
}
