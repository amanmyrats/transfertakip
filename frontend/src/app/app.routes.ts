import { Routes } from '@angular/router';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ReservationListComponent } from './company/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './company/reservation-form/reservation-form.component';


export const routes: Routes = [
    {path: 'create', component: CreateReservationComponent},
    {
        path: 'company', 
        children:[
            {path: 'reservations', component: ReservationListComponent}, 
            {path: 'reservationcreate', component: ReservationFormComponent}, 
        ]
    }
];
