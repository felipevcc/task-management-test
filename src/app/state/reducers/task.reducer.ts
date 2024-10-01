import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.action';
import { Task } from 'src/app/models/task.interface';

export interface TaskState {
  tasks: Task[];
  error: string | null;
  loading: boolean;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
  loading: false,
};

export const taskReducer = createReducer(
  initialState,

  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    loading: false
  })),

  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false
  })),

  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(TaskActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t),
  })),

  on(TaskActions.removeTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId),
  }))
);
