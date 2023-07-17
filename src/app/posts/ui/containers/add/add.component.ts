import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  constructor(private fb: FormBuilder) {}

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
    }
  }
}
