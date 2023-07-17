import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostSkeletonComponent {}
