import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ServiceManagerComponent } from './service-manager/service-manager.component';
import { TransferTaskFormComponent } from './transfer-task-form/transfer-task-form.component';
import { ViewWorkflowComponent } from './view-workflow/view-workflow.component';
import { WorkflowService } from './workflow.service';
import { LoginFormComponent } from './login-form/login-form.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { OrderedServiceFormComponent } from './ordered-service-form/ordered-service-form.component';
import { WorkflowResolverService } from './workflow-resolver.service';
import { ViewStaticWorkflowComponent } from './view-static-workflow/view-static-workflow.component';
import { StaticWorkflowService } from './static-workflow.service';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ViewOrderedServicesComponent } from './view-ordered-services/view-ordered-services.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { AuthAndRoleService } from './auth-and-role.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TokenInterceptor } from './jwt.interceptor';
import { ServiceComponent } from './service/service.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: ServiceListComponent, canActivate: [AuthAndRoleService] },
  // { path:'dashboard',outlet:"addService",component:ServiceFormComponent},
  // { path:'dashboard',outlet:"addTeam",component:TeamFormComponent},
  // { path: 'dashboard', component: TeamListComponent },
  { path: 'orderedTasks', component: OrderedTaskListComponent, canActivate: [AuthAndRoleService]},
  { path: 'orderedTask', component: TaskStatusComponent, canActivate: [AuthAndRoleService] },
  { path: 'orderedServices', component: ProjectManagerComponent, canActivate: [AuthAndRoleService] },
  { path: 'serviceManager', component: ServiceManagerComponent, canActivate: [AuthAndRoleService] },
  {path : 'login', component: LoginFormComponent},
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthAndRoleService]},
  { path: 'workflow',
    component: ViewWorkflowComponent,
    canActivate: [AuthAndRoleService]
    // resolve: {
    //   taskWorkflow: WorkflowResolverService
    // }
  },
  { path: 'cworkflow', component: CreateWorkflowComponent },
  { path: 'sworkflow', component: ViewStaticWorkflowComponent },
  { path: 'addService', component: AddServiceComponent},
  { path: 'vservices', component: ViewOrderedServicesComponent},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'teamInfo', component: TeamInfoComponent},
  { path: 'home', component: HomeComponent}
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
    ViewWorkflowComponent,
    LoginFormComponent,
    EmployeeComponent,
    ProjectFormComponent,
    CustomerFormComponent,
    CreateWorkflowComponent,
    OrderedServiceFormComponent,
    ViewStaticWorkflowComponent,
    ProjectListComponent,
    AddServiceComponent,
    ViewOrderedServicesComponent,
    TaskHistoryComponent,
    TeamInfoComponent,
    ForbiddenComponent,
    ServiceComponent,
    TaskComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatButtonToggleModule,
    HttpClientModule
  ],
  providers: [WorkflowService, StaticWorkflowService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
