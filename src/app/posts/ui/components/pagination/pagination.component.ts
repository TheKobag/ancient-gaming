import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { PaginationItemComponent } from './pagination-item/pagination-item.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, PaginationItemComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() actualPage: number = 1;
  @Input() lastPage: number = 10;
  @Output() onGoToPageClick = new EventEmitter<number>();

  pages$: Observable<Array<number>> = this.getPages(this.actualPage).pipe(
    switchMap((pages: Array<number>) => {
      return [pages];
    })
  );

  onGoToPage(page: number) {
    this.pages$ = this.getPages(page);
    this.onGoToPageClick.emit(page);
  }

  private getPages(actualPage: number): Observable<Array<number>> {
    let pages = [1, 2, 3, 4, this.lastPage];
    if (actualPage >= 4 && actualPage < this.lastPage - 3) {
      pages = [1, actualPage - 1, actualPage, actualPage + 1, this.lastPage];
    } else if (actualPage >= this.lastPage - 3) {
      pages = [
        1,
        this.lastPage - 3,
        this.lastPage - 2,
        this.lastPage - 1,
        this.lastPage,
      ];
    }

    return of(pages);
  }
}
