import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationItemComponent {
  @Input() pageNumber: number = 1;
}
