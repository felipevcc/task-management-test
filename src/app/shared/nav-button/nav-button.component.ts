import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss']
})
export class NavButtonComponent {
  @Input() label: string = '';
  @Input() selected: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  onBtnClick() {
    this.onClick.emit();
  }
}
