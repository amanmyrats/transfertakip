import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ActiveRouteService } from '../../services/active-route.service';
import { Router } from '@angular/router';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss', 
    standalone: true,
    imports: [
        MenubarModule, 
        BadgeModule, 
        AvatarModule, 
        InputTextModule, 
        RippleModule, 
        CommonModule, 
        OverlayPanelModule, 
        ButtonModule, 
        MenuModule
    ]
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined;
    userMenuItems: MenuItem[] | undefined;
    activeRoute: string = '';
    logoPath: string = '';
    @ViewChild('op') op: OverlayPanel | null = null;

    constructor(
        private activeRouteService: ActiveRouteService, 
        private router: Router, 
        ) {}

    ngOnInit() {
        this.logoPath = 'assets/images/logo_resized.png';
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
                label: 'Admin',
                icon: 'pi pi-user-edit',
                items: [
                    {
                        label: 'Sürücüler',
                        icon: 'pi pi-pencil',
                        routerLink: '/company/drivers'
                    },
                    {
                        label: 'Kullanıcılar',
                        icon: 'pi pi-pencil',
                        routerLink: '/company/users'
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
                        label: 'Araba Tipleri',
                        icon: 'pi pi-pencil',
                        routerLink: '/company/cartypes'
                    },
                    {
                        label: 'Harcama Tipleri',
                        icon: 'pi pi-pencil',
                        routerLink: '/company/expensetypes'
                    },
                    {
                        separator: true
                    },
                ]
            },
        ];
    
        this.userMenuItems = [
            {
                label: 'Profil',
                icon: 'pi pi-user', 
                command: () => this.onMenuItemClick('/company/users/profile')
         
            },
            {
                label: 'Şifre değiştir',
                icon: 'pi pi-key', 
                command: () => this.onMenuItemClick('/company/users/changepassword')
            },
            {
                label: 'Çıkış',
                icon: 'pi pi-sign-out', 
                command: () => this.onMenuItemClick('/logout')
            },
        ];

        this.activeRouteService.activeRoute$.subscribe(route => {
            this.activeRoute = route;
        });
    }

    onMenuItemClick(linkAddress: string) {
        (this.op ?? { hide: () => {} }).hide();
        this.router.navigateByUrl(linkAddress);
      }

}