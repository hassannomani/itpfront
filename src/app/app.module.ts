import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './uitools/button/button.component';
import { AddAgentComponent } from './agent/add-agent/add-agent.component';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { ListAgentComponent } from './agent/list-agent/list-agent.component';
import { AddRepresentativeComponent } from './representative/add-representative/add-representative.component';
import { ListRepresentativeComponent } from './representative/list-representative/list-representative.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ResetUserComponent } from './user/reset-user/reset-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { NbrMenuComponent } from './layouts/nbr-menu/nbr-menu.component';
import { AdminMenuComponent } from './layouts/admin-menu/admin-menu.component';
import { RepresentativeMenuComponent } from './layouts/representative-menu/representative-menu.component';
import { ViewerMenuComponent } from './layouts/viewer-menu/viewer-menu.component';
import { ApproveRepresentativeComponent } from './representative/approve-representative/approve-representative.component';
import { ApproveRepresentativeSingleComponent } from './representative/approve-representative-single/approve-representative-single.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AgentRepresentativeComponent } from './agent/agent-representative/agent-representative.component';
import { AgentLedgerComponent } from './ledger/agent-ledger/agent-ledger.component';
import { AdminLedgerComponent } from './ledger/admin-ledger/admin-ledger.component';
import { RepresentativeLedgerComponent } from './ledger/representative-ledger/representative-ledger.component';
import { EditAgentComponent } from './agent/edit-agent/edit-agent.component';
import { UsernameNotFoundRedirectComponent } from './dialogs/username-not-found-redirect/username-not-found-redirect.component';
import { ReportAdminComponent } from './report/report-admin/report-admin.component';
import { ReportAdminOutputComponent } from './report/report-admin-output/report-admin-output.component';
import { UserActionComponent } from './user/user-action/user-action.component';
import { ActionListComponent } from './action/action-list/action-list.component';
import { ActionSingleComponent } from './action/action-single/action-single.component';
import { ActionListBlockedComponent } from './action/action-list-blocked/action-list-blocked.component';
import { ActionListDeniedComponent } from './action/action-list-denied/action-list-denied.component';
import { ActionHistoryComponent } from './action/action-history/action-history.component';
import { ConfirmModalComponent } from './layouts/confirm-modal/confirm-modal.component';
import { DataSavedModalComponent } from './layouts/data-saved-modal/data-saved-modal.component';
import { ReportAgentComponent } from './report/report-agent/report-agent.component';
import { ReportTrpComponent } from './report/report-trp/report-trp.component';
import { ListCertificateComponent } from './certificate/list-certificate/list-certificate.component';
import { FileTaxComponent } from './representative/file-tax/file-tax.component';
import { RegisterComponent } from './user/register/register.component';
import { RegisterFillupComponent } from './user/register-fillup/register-fillup.component';
import { DetailsModalComponent } from './layouts/details-modal/details-modal.component';
import { DetailsModalAgentComponent } from './layouts/details-modal-agent/details-modal-agent.component';
import { AgentSelectionModalComponent } from './layouts/agent-selection-modal/agent-selection-modal.component';
import { PreviousTrpComponent } from './history/previous-trp/previous-trp.component';
import { PreviousAgentComponent } from './history/previous-agent/previous-agent.component';
import { AuthInterceptor } from './auth.interceptor';
import { NsButtonComponent } from './uitools/ns-button/ns-button.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    ForgetPasswordComponent,
    // ButtonComponent,
    AddAgentComponent,
    ToolbarComponent,
    MenuComponent,
    ListAgentComponent,
    AddRepresentativeComponent,
    ListRepresentativeComponent,
    AddUserComponent,
    ResetUserComponent,
    LogoutComponent,
    NbrMenuComponent,
    AdminMenuComponent,
    RepresentativeMenuComponent,
    ViewerMenuComponent,
    ApproveRepresentativeComponent,
    ApproveRepresentativeSingleComponent,
    DashboardComponent,
    AgentRepresentativeComponent,
    AgentLedgerComponent,
    AdminLedgerComponent,
    RepresentativeLedgerComponent,
    EditAgentComponent,
    UsernameNotFoundRedirectComponent,
    ReportAdminComponent,
    ReportAdminOutputComponent,
    UserActionComponent,
    ActionListComponent,
    ActionSingleComponent,
    ActionListBlockedComponent,
    ActionListDeniedComponent,
    ActionHistoryComponent,
    ConfirmModalComponent,
    DataSavedModalComponent,
    ReportAgentComponent,
    ReportTrpComponent,
    FileTaxComponent,
    RegisterComponent,
    RegisterFillupComponent,
    DetailsModalComponent,
    DetailsModalAgentComponent,
    AgentSelectionModalComponent,
    PreviousTrpComponent,
    PreviousAgentComponent,
    NsButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    HttpClientModule,
    DatePipe
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
