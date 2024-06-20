import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table'
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';


@Component({
  selector: 'app-operasyon',
  standalone: true,
  imports: [TableModule],
  templateUrl: './operasyon.component.html',
  styleUrl: './operasyon.component.scss'
})
export class OperasyonComponent implements OnInit {
  reservations: Reservation[] = [];
  loading: boolean = false;

  constructor(
    private reservationService: ReservationService,
  ){
  }
  
  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.reservationService.getReservations().subscribe({
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
}
