import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { CompanyHomeComponent } from './company/company-home/company-home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'create', component: CreateReservationComponent},
    {
        path: 'company', component: CompanyHomeComponent,
        loadChildren: () => import('./company/company-routing.module').then(m => m.CompanyRoutingModule)
    }, 
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterComponent},];
