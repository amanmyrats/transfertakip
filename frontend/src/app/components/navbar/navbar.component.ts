import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ActiveRouteService } from '../../services/active-route.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss', 
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule]
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined;
    activeRoute: string = '';

    constructor(
        private activeRouteService: ActiveRouteService, 
        private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Anasayfa',
                icon: 'pi pi-home', 
                routerLink: '/company'
            },
            {
                label: 'Operasyon',
                icon: 'pi pi-car', 
                routerLink: '/company/operation', 
                badge: '12'
            },
            {
                label: 'Rezervasyonlar',
                icon: 'pi pi-address-book', 
                routerLink: '/company/reservations',
                routerLinkActive: 'active-menu-item'
            },
            {
                label: 'Giderler',
                icon: 'pi pi-address-book', 
                routerLink: '/company/expenses'
            },
            {
                label: 'Admin',
                icon: 'pi pi-user-edit',
                items: [
                    {
                        label: 'Acenteler',
                        icon: 'pi pi-bolt', 
                        routerLink: '/company/agencies'
                    },
                    {
                        label: 'Taşeronlar',
                        icon: 'pi pi-server',
                        routerLink: '/company/taserons'
                    },
                    {
                        label: 'Sürücüler',
                        icon: 'pi pi-pencil',
                        routerLink: '/company/drivers'
                    },
                    {
                        label: 'Araba Tipleri',
                        icon: 'pi pi-pencil',
                        routerLink: '/company/cartypes'
                    },
                    {
                        label: 'Arabalar',
                        icon: 'pi pi-pencil',
                        routerLink: '/company/cars'
                    },
                    {
                        label: 'Para Birimleri',
                        icon: 'pi pi-pencil',
                        routerLink: '/company/currencies'
                    },
                    {
                        separator: true
                    },
                ]
            },
        ];
    
    this.activeRouteService.activeRoute$.subscribe(route => {
        this.activeRoute = route;
    });
}
}