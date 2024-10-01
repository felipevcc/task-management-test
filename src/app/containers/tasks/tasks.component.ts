import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ModalCreateTaskComponent } from 'src/app/components/modal-create-task/modal-create-task.component';
import { Task } from 'src/app/models/task.interface';
import * as TaskActions from 'src/app/state/actions/task.action';
import * as TaskSelectors from 'src/app/state/selectors/task.selector';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  @ViewChild(ModalCreateTaskComponent) modalCreateTask!: ModalCreateTaskComponent;
  tasks$: Observable<Task[]>;
  taskFilters = ['Todas', 'Completadas', 'Pendientes'];
  selectedFilter = 'Todas';

  constructor(private store: Store) {
    this.loadTasks();
    this.tasks$ = this.store.select(TaskSelectors.selectAllTasks);
  }

  ngOnInit() { }

  loadTasks() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.tasks$ = this.store.select(TaskSelectors.selectAllTasks).pipe(
      map(tasks => {
        switch (filter) {
          case 'Completadas':
            return tasks.filter(task => task.completed);
          case 'Pendientes':
            return tasks.filter(task => !task.completed);
          default:
            return tasks;
        }
      })
    );
  }

  toggleTaskState(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }

}
