import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table'
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { SharedToolbarComponent } from '../../components/shared-toolbar/shared-toolbar.component';
import { FilterSearchComponent } from '../../components/filter-search/filter-search.component';
import { Agency } from '../../partner/models/agency.model';
import { Taseron } from '../../partner/models/taseron.model';
import { Driver } from '../models/driver.model';
import { AgencyService } from '../../partner/services/agency.service';
import { TaseronService } from '../../partner/services/taseron.service';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [
    TableModule, 
    SharedToolbarComponent, 
    ToastModule, 
    ConfirmDialogModule,
    ActionButtonsComponent, 
    FilterSearchComponent
  ],
  providers: [
    DialogService, 
    MessageService, 
    ConfirmationService,
  ],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;
  agencies: Agency[] = [];
  taserons: Taseron[] = [];
  drivers: Driver[] = [];

  constructor(
    private reservationService: ReservationService,
    private dialogService: DialogService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService, 
    private agencyService: AgencyService,
    private taseronService: TaseronService,
    private driverService: DriverService,
  ){
  }
  
  ngOnInit(): void {
    this.getReservations('');
  }

  search(queryString: string = ''): void {
    console.log("Search button clicked");
    console.log(queryString);
    this.getReservations(queryString);
  }

  getReservations(queryString: string = ''){
    this.reservationService.getReservations(queryString).subscribe({
      next: (reservations: Reservation[]) => {
        this.reservations = reservations
        console.log("Successfully fetched reservations");
        console.log(reservations);
      },
      error: (error: any) => {
        console.log("Error happened when fetching reservations.");
        console.log(error);
      }
    })
  }

  showForm(reservationToEdit: Reservation | null = null): void {
    this.ref = this.dialogService.open(ReservationFormComponent, {
      header: 'Create Reservation',
      width: '90%',
      contentStyle: {"min-height": "500px", "overflow": "auto"},
      baseZIndex: 10000, 
      data: {
        reservation: reservationToEdit
      }
    });

    this.ref.onClose.subscribe((reservation: Reservation) => {
      if (reservation) {
        this.getReservations();
        if (reservationToEdit) {
          this.messageService.add(
            {severity:'success', summary: 'Success ', detail: 'Rezervasyon başarıyla güncellendi!'});
        } else {
          this.messageService.add(
            {severity:'success', summary: 'Success', detail: 'Rezervasyon başarıyla oluşturuldu!'});
          }
      }
    });
  }

  createObj(): void {
    this.showForm();
  }

  updateObj(reservation: Reservation): void {
    this.showForm(reservation);
  }

  deleteObj(id: string): void {
    this.confirmationService.confirm({
      message: 'Silmek istediğinizden emin misiniz?',
      header: 'Silme İşlemi',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Sil",
      rejectLabel: "Vazgeç",
      dismissableMask: true,

      accept: () => {
        this.reservationService.deleteReservation(id).subscribe({
          next: () => {
            this.getReservations();
              this.messageService.add(
                {severity:'success', summary:'Başarılı', detail:'Başarıyla silindi!'});
          },
          error: (error: any) => {
            console.log("Error happened when deleting reservation");
            console.log(error);
          }
        });
      }
    });

  }

  getAgencies(): void {
    console.log("Getting agencies...");
    this.agencyService.getAgencies().subscribe({
      next: (agencies: Agency[]) => {
        this.agencies = agencies;
        console.log("Successfully fetched agencies");
        console.log(agencies);
      },
      error: (error: any) => {
        console.log("Error happened when fetching agencies");
        console.log(error);
      }
    });
  }

  getTaserons(): void {
    console.log("Getting taserons...");
    this.taseronService.getTaserons().subscribe({
      next: (taserons: Taseron[]) => {
        this.taserons = taserons;
        console.log("Successfully fetched taserons");
        console.log(taserons);
      },
      error: (error: any) => {
        console.log("Error happened when fetching taserons");
        console.log(error);
      }
    });
  }

  getDrivers(): void {
    console.log("Getting drivers...");
    this.driverService.getDrivers().subscribe({
      next: (drivers: Driver[]) => {
        this.drivers = drivers;
        console.log("Successfully fetched drivers");
        console.log(drivers);
      },
      error: (error: any) => {
        console.log("Error happened when fetching drivers");
        console.log(error);
      }
    });
  }
}
