import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/posts/models/post.model';
import { addPost, updatePost } from 'src/app/posts/store/posts.actions';
import { PostFormComponent } from '../../components/post-form/post-form.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, PostFormComponent],
  templateUrl: './add.component.html',
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

  store = inject(Store);
  router = inject(Router);
  fb = inject(FormBuilder);

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state;

    if (state) {
      this.post = state['newPost'];
      this.isUpdate = true;
    }

    this.postForm = this.fb.group({
      title: new FormControl(this.post.title, Validators.required),
      body: new FormControl(this.post.body, Validators.required),
    });
  }

  onSubmitForm(submit: boolean): void {
    if (submit) {
      if (this.isUpdate) {
        this.store.dispatch(
          updatePost({ newPost: { id: this.post.id, ...this.postForm.value } })
        );
      } else {
        this.store.dispatch(
          addPost({
            newPost: this.postForm.value,
          })
        );
      }
      this.router.navigate(['posts']);
    }
  }
}
