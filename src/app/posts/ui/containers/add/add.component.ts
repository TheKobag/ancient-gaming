import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostStoreService } from 'src/app/posts/store/posts-store.service';
import { Store } from '@ngrx/store';
import { addPost, getAllPosts } from 'src/app/posts/store/posts.actions';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, PostFormComponent],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent implements OnInit {
  postForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private postStoreService: PostStoreService
  ) {}

  store = inject(Store);

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  onSubmitForm(submit: boolean): void {
    if (submit) {
      console.log(this.postForm);
      // update store
      this.store.dispatch(
        addPost({
          newPost: this.postForm.value,
        })
      );
      // this.postStoreService.addPost(this.postForm.value);
    }
  }
}
