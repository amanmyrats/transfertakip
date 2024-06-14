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

const routes: Routes = [
    {path: 'operation', component: OperasyonComponent}, 
    {path: 'reservations', component: ReservationListComponent}, 
    {path: 'reservationcreate', component: ReservationFormComponent}, 
    {path: 'expenses', component: ExpenseListComponent}, 
    {path: 'agencies', component: AgencyListComponent}, 
    {path: 'taserons', component: TaseronListComponent},
    {path: 'drivers', component: DriverListComponent}, 
    {path: 'cartypes', component: CarTypeListComponent}, 
    {path: 'cars', component: CarListComponent}, 
    {path: 'currencies', component: CurrencyListComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use ForChild for lazy loading
  exports: [RouterModule]
})
export class CompanyRoutingModule { }