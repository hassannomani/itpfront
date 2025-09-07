import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgentComponent } from './agent/add-agent/add-agent.component';
import { AgentRepresentativeComponent } from './agent/agent-representative/agent-representative.component';
import { EditAgentComponent } from './agent/edit-agent/edit-agent.component';
import { ListAgentComponent } from './agent/list-agent/list-agent.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { AdminLedgerComponent } from './ledger/admin-ledger/admin-ledger.component';
import { AgentLedgerComponent } from './ledger/agent-ledger/agent-ledger.component';
import { RepresentativeLedgerComponent } from './ledger/representative-ledger/representative-ledger.component';
import { ReportAdminComponent } from './report/report-admin/report-admin.component';
import { AddRepresentativeComponent } from './representative/add-representative/add-representative.component';
import { ApproveRepresentativeSingleComponent } from './representative/approve-representative-single/approve-representative-single.component';
import { ApproveRepresentativeComponent } from './representative/approve-representative/approve-representative.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UserActionComponent } from './user/user-action/user-action.component';
import { ActionListComponent } from './action/action-list/action-list.component';
import { ActionSingleComponent } from './action/action-single/action-single.component';
import { ActionListBlockedComponent } from './action/action-list-blocked/action-list-blocked.component';
import { ActionListDeniedComponent } from './action/action-list-denied/action-list-denied.component';
import { ActionHistoryComponent } from './action/action-history/action-history.component';

import { ReportAgentComponent } from './report/report-agent/report-agent.component';
import { ReportTrpComponent } from './report/report-trp/report-trp.component';
import { UploadCertificaateComponent } from './certificate/upload-certificaate/upload-certificaate.component';
import { ListCertificateComponent } from './certificate/list-certificate/list-certificate.component';
import { FileTaxComponent } from './representative/file-tax/file-tax.component';
import { RegisterComponent } from './user/register/register.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { PreviousTrpComponent } from './history/previous-trp/previous-trp.component';
import { PreviousAgentComponent } from './history/previous-agent/previous-agent.component';
import { AdminAuthGuard } from './admin-auth.guard';

const routes: Routes = [
  {
    path: "",
    //component: LoginComponent,
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)

  },
  { 
    path: "users",
    loadComponent: () => import('./user/list-user/list-user.component').then(m => m.ListUserComponent)
  },
  {
    path: "profile",
    loadComponent: () => import('./user/change-password/change-password.component').then(m => m.ChangePasswordComponent)
  },
  {
    path: "upload-certificate",
    loadComponent: () => import('./certificate/upload-certificaate/upload-certificaate.component').then(m => m.UploadCertificaateComponent),
    canActivate: [AdminAuthGuard]
  },
  {
    path: "list-certificate",
    loadComponent: () => import('./certificate/list-certificate/list-certificate.component').then(m => m.ListCertificateComponent),
  
  },
  {path: "add-agent", component: AddAgentComponent},
  {path: "add-itp", component: AddRepresentativeComponent},
  {path: "add-user", component: AddUserComponent},
  {path: "logout", component: LogoutComponent},
  {path: "list-agents", component: ListAgentComponent},
  {path: "approve-itp", component: ApproveRepresentativeComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "approve-representative-details", component: ApproveRepresentativeSingleComponent},
  {path: "agent-representative", component: AgentRepresentativeComponent},
  {path: "ledger-agent", component: AgentLedgerComponent},
  {path: "ledger-admin", component: AdminLedgerComponent},
  {path: "ledger-itp", component: RepresentativeLedgerComponent},
  {path: "edit-agent", component: EditAgentComponent},
  {path: "report-admin", component: ReportAdminComponent},
  {path: "user-action", component: UserActionComponent},
  {path: "message-list", component: ActionListComponent},
  {path: "message", component: ActionSingleComponent},
  {path: "blocked-users", component: ActionListBlockedComponent},
  {path: "denied-users", component: ActionListDeniedComponent},
  {path: "action-history", component: ActionHistoryComponent},
  {path: "report-agent", component: ReportAgentComponent},
  {path: "report-trp", component: ReportTrpComponent},
  {path: "file-tax", component: FileTaxComponent},
  {path: "register", component: RegisterComponent},
  {path: "register-fillup", component: AddRepresentativeComponent},
  {
    path: "list",
    loadComponent: () => import('./certificate/list-public/list-public.component').then(m => m.ListPublicComponent),
  },

  // {path: "previous-trp", component: PreviousTrpComponent},
  // {path: "previous-rc", component: PreviousAgentComponent},
  { path: '**', pathMatch: 'full', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
