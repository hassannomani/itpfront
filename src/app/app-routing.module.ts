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
import { ReturnSubmitComponent } from './submission/return-submit/return-submit.component';
import { UserActionComponent } from './user/user-action/user-action.component';
import { ActionListComponent } from './action/action-list/action-list.component';
import { ActionSingleComponent } from './action/action-single/action-single.component';
import { ActionListBlockedComponent } from './action/action-list-blocked/action-list-blocked.component';
import { ActionListDeniedComponent } from './action/action-list-denied/action-list-denied.component';
import { ActionHistoryComponent } from './action/action-history/action-history.component';
import { ListMetricsComponent } from './metrics/list-metrics/list-metrics.component';
import { AddMetricsComponent } from './metrics/add-metrics/add-metrics.component';
import { CommissionComponent } from './commission/commission/commission.component';
import { CommissionDetailsComponent } from './commission/commission-details/commission-details.component';
import { CommissionTrpComponent } from './commission/commission-trp/commission-trp.component';
import { ReportAgentComponent } from './report/report-agent/report-agent.component';
import { ReportTrpComponent } from './report/report-trp/report-trp.component';
import { UploadCertificaateComponent } from './certificate/upload-certificaate/upload-certificaate.component';
import { ListCertificateComponent } from './certificate/list-certificate/list-certificate.component';
import { FileTaxComponent } from './representative/file-tax/file-tax.component';
import { RegisterComponent } from './user/register/register.component';
import { BillSubmitComponent } from './bill/bill-submit/bill-submit.component';
import { BillPendingComponent } from './bill/bill-pending/bill-pending.component';
import { BillRejectedComponent } from './bill/bill-rejected/bill-rejected.component';
import { BillApprovedComponent } from './bill/bill-approved/bill-approved.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { TrpComponent } from './trp-agent-transfer/trp/trp.component';
import { AdminTransferPendingTRPComponent } from './trp-agent-transfer/admin/admin.component';
import { AgentChangeTRPComponent } from './trp-agent-transfer/agent/agent.component';
import { AdminTransferPendingAgentReqComponent } from './trp-agent-transfer/admin-agent/admin-agent.component';
import { PreviousTrpComponent } from './history/previous-trp/previous-trp.component';
import { PreviousAgentComponent } from './history/previous-agent/previous-agent.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "add-agent", component: AddAgentComponent},
  {path: "add-representative", component: AddRepresentativeComponent},
  {path: "add-user", component: AddUserComponent},
  {path: "users", component: ListUserComponent},
  {path: "logout", component: LogoutComponent},
  {path: "list-agents", component: ListAgentComponent},
  {path: "approve-representatives", component: ApproveRepresentativeComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "approve-representative-details", component: ApproveRepresentativeSingleComponent},
  {path: "agent-representative", component: AgentRepresentativeComponent},
  {path: "ledger-agent", component: AgentLedgerComponent},
  {path: "ledger-admin", component: AdminLedgerComponent},
  {path: "ledger-representative", component: RepresentativeLedgerComponent},
  {path: "edit-agent", component: EditAgentComponent},
  {path: "report-admin", component: ReportAdminComponent},
  {path: "return-submit", component: ReturnSubmitComponent},
  {path: "user-action", component: UserActionComponent},
  {path: "message-list", component: ActionListComponent},
  {path: "message", component: ActionSingleComponent},
  {path: "blocked-users", component: ActionListBlockedComponent},
  {path: "denied-users", component: ActionListDeniedComponent},
  {path: "action-history", component: ActionHistoryComponent},
  {path: "list-metrics", component: ListMetricsComponent},
  {path: "add-metrics", component: AddMetricsComponent},
  {path: "commission", component: CommissionComponent},
  {path: "commission-single", component: CommissionDetailsComponent},
  {path: "commission-trp", component: CommissionTrpComponent},
  {path: "report-agent", component: ReportAgentComponent},
  {path: "report-trp", component: ReportTrpComponent},
  {path: "upload-certificate", component: UploadCertificaateComponent},
  {path: "list-certificate", component: ListCertificateComponent},
  {path: "file-tax", component: FileTaxComponent},
  {path: "register", component: RegisterComponent},
  {path: "register-fillup", component: AddRepresentativeComponent},
  {path: "bill-submit", component: BillSubmitComponent},
  {path: "bill-pending", component: BillPendingComponent},
  {path: "bill-rejected", component: BillRejectedComponent},
  {path: "bill-approved", component: BillApprovedComponent},
  {path: "profile", component: ChangePasswordComponent},
  {path: "change-agent", component: TrpComponent},
  {path: "change-trp", component: AgentChangeTRPComponent},
  {path: "previous-trp", component: PreviousTrpComponent},
  {path: "previous-rc", component: PreviousAgentComponent},
  {path: "transfer-pending-trp", component: AdminTransferPendingTRPComponent},
  {path: "transfer-pending-agent", component: AdminTransferPendingAgentReqComponent},
  { path: '**', pathMatch: 'full', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
