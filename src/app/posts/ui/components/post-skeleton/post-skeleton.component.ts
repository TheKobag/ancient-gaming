import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-skeleton.component.html',
  styleUrls: ['./post-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostSkeletonComponent {

}
