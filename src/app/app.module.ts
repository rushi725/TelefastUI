import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderedTaskListComponent } from './ordered-task-list/ordered-task-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { OrderedTaskDetailComponent } from './ordered-task-detail/ordered-task-detail.component';
import { StatusChangeComponent } from './status-change/status-change.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { OrderedServiceListComponent } from './ordered-service-list/ordered-service-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ServiceManagerComponent } from './service-manager/service-manager.component';
import { TransferTaskFormComponent } from './transfer-task-form/transfer-task-form.component';
import { ViewWorkflowComponent } from './view-workflow/view-workflow.component';
import { WorkflowService } from './workflow.service';

const routes: Routes = [
  // { path: '', component: NavbarComponent},
  { path: 'dashboard', component: ServiceListComponent},
  // { path:'dashboard',outlet:"addService",component:ServiceFormComponent},
  // { path:'dashboard',outlet:"addTeam",component:TeamFormComponent},
  { path: 'dashboard', component: TeamListComponent},
  { path: 'orderedTasks', component: OrderedTaskListComponent},
  {path : 'orderedTask', component: TaskStatusComponent},
  {path : 'orderedServices', component: ProjectManagerComponent},
  {path : 'serviceManager', component: ServiceManagerComponent},
  {path : 'workflow', component: ViewWorkflowComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ServiceListComponent,
    TeamComponent,
    TeamListComponent,
    ServiceFormComponent,
    TeamFormComponent,
    OrderedTaskListComponent,
    TaskListComponent,
    OrderedTaskDetailComponent,
    StatusChangeComponent,
    TaskStatusComponent,
    OrderedServiceListComponent,
    TaskFormComponent,
    ProjectDetailComponent,
    ProductManagerComponent,
    ProjectManagerComponent,
    ServiceManagerComponent,
    TransferTaskFormComponent,
    ViewWorkflowComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    MatProgressBarModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTreeModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatButtonToggleModule
  ],
  providers: [WorkflowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
