import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyHomeComponent } from './company-home/company-home.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { OperasyonComponent } from './operasyon/operasyon.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AgencyListComponent } from '../partner/agency-list/agency-list.component';
import { TaseronListComponent } from '../partner/taseron-list/taseron-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { CarTypeListComponent } from './car-type-list/car-type-list.component';
import { CarListComponent } from './car-list/car-list.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ExpenseTypeListComponent } from './expense-type-list/expense-type-list.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
    {path: '', component: ReportComponent}, 
    {path: 'operation', component: OperasyonComponent}, 
    {path: 'reservations', component: ReservationListComponent}, 
    {path: 'reservationcreate', component: ReservationFormComponent}, 
    {path: 'expenses', component: ExpenseListComponent}, 
    {path: 'agencies', component: AgencyListComponent}, 
    {path: 'taserons', component: TaseronListComponent},
    {path: 'drivers', component: DriverListComponent}, 
    {path: 'cars', component: CarListComponent}, 
    {path: 'currencies', component: CurrencyListComponent}, 
    {path: 'cartypes', component: CarTypeListComponent}, 
    {path: 'expensetypes', component: ExpenseTypeListComponent}, 
    {path: 'users', component: UserListComponent}, 
    {path: 'users/profile', component: UserDetailComponent}, 
    {path: 'users/changepassword', component: ChangePasswordComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use ForChild for lazy loading
  exports: [RouterModule]
})
export class CompanyRoutingModule { }