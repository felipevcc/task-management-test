import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Paths } from './enums/paths.enum';
import { TasksComponent } from './containers/tasks/tasks.component';

const routes: Routes = [
  {
    path: Paths.Home,
    title: 'Tasks | Home',
    component: TasksComponent
  },
  {
    path: Paths.Undefined,
    title: "Tasks | Page not found",
    redirectTo: Paths.Home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
