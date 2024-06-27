import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table'
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { Agency } from '../../partner/models/agency.model';
import { FilterSearchComponent } from '../../components/filter-search/filter-search.component';
import { Taseron } from '../../partner/models/taseron.model';
import { Driver } from '../models/driver.model';
import { AgencyService } from '../../partner/services/agency.service';
import { DriverService } from '../services/driver.service';
import { TaseronService } from '../../partner/services/taseron.service';


@Component({
  selector: 'app-operasyon',
  standalone: true,
  imports: [TableModule, FilterSearchComponent],
  templateUrl: './operasyon.component.html',
  styleUrl: './operasyon.component.scss'
})
export class OperasyonComponent implements OnInit {
  reservations: Reservation[] = [];
  loading: boolean = false;
  agencies: Agency[] = [];
  taserons: Taseron[] = [];
  drivers: Driver[] = [];

  constructor(
    private reservationService: ReservationService,
    private agencyService: AgencyService,
    private taseronService: TaseronService,
    private driverService: DriverService,
  ){
  }
  
  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(queryString: string = ''): void {
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

  search(queryString: string = ''): void {
    console.log("Search button clicked");
    console.log(queryString);
    this.getReservations(queryString);
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
