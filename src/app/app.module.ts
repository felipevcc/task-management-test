import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TasksComponent } from './containers/tasks/tasks.component';
import { NavButtonComponent } from "./shared/nav-button/nav-button.component";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCreateTaskComponent } from './components/modal-create-task/modal-create-task.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { taskReducer } from './state/reducers/task.reducer';
import { TaskEffects } from './state/effects/task.effect';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ModalCreateTaskComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ tasks: taskReducer }),
    EffectsModule.forRoot([TaskEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NavButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
