import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationItemComponent {
  @Input() pageNumber: number = 1;
}
