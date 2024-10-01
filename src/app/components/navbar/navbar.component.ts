import { Component, ViewChild } from '@angular/core';
import { ModalCreateTaskComponent } from 'src/app/components/modal-create-task/modal-create-task.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild(ModalCreateTaskComponent) modalCreateTask!: ModalCreateTaskComponent;

  constructor() { }

  ngOnInit() { }

  openModal() {
    this.modalCreateTask.open();
  }

}
