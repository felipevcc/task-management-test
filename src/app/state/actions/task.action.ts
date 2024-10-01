import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/task.interface';

export const loadTasks = createAction('[Task List] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task List] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Task List] Load Tasks Failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Task List] Add Task',
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  '[Task List] Add Task Success',
  props<{ task: Task }>()
);

export const addTaskFailure = createAction(
  '[Task List] Add Task Failure',
  props<{ error: any }>()
);

export const updateTask = createAction(
  '[Task List] Update Task',
  props<{ task: Task }>()
);

export const removeTask = createAction(
  '[Task List] Remove Task',
  props<{ taskId: number }>()
);
