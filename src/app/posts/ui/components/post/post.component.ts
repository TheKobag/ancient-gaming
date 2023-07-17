import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() title!: string;
  @Input() body!: string;
  @Input() id!: string;
  @Output() removePost = new EventEmitter<string>();
  @Output() updatePost = new EventEmitter<string>();
}
