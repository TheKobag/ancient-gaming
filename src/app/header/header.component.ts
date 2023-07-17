import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  toggleDropdown(): void {
    const dropdownElement = document.getElementById('dropdownNavbar');
    if (dropdownElement?.classList.contains('hidden')) {
      document.getElementById('dropdownNavbar')?.classList.remove('hidden');
    } else {
      document.getElementById('dropdownNavbar')?.classList.add('hidden');
    }
  }
}
