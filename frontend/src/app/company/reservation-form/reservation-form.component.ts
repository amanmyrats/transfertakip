import { Component, OnInit } from '@angular/core';
import { Agency } from '../../partner/models/agency.model';
import { AgencyService } from '../../partner/services/agency.service';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule,} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Reservation } from '../models/reservation.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReservationService } from '../services/reservation.service';
import { Currency } from '../models/currency.model';
import { CarType } from '../models/car-type.model';
import { Driver } from '../models/driver.model';
import { Car } from '../models/car.model';
import { Taseron } from '../../partner/models/taseron.model';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [DropdownModule, InputTextModule, ButtonModule, ReactiveFormsModule ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss'
})
export class ReservationFormComponent implements OnInit {
  agencies: Agency[] = [];
  currencies: Currency[] = [];
  carTypes: CarType[] = [];
  drivers: Driver[] = [];
  cars: Car[] = [];
  taserons: Taseron[] = [];

  reservation: Reservation | undefined;
  reservationForm: FormGroup;

  constructor(
    private agencyService: AgencyService,
    private reservationService: ReservationService,
    private fb: FormBuilder,
  ){
    this.reservationForm = this.fb.group({
      id: "",
  
      agency: "",
      is_nakit: false,
      amount: "",
      currency: "",
      agency_comission: 0,
      reservation_date: new Date().toISOString().split('T')[0],

      transfer_type: "ARR",
      car_type: "",
      transfer_date: new Date().toISOString().split('T')[0],
      transfer_time: "",
      flight_number: "",
    
      passenger_name: "",
      passenger_count: 1,
      note: "",
    
      pickup_short: "",
      pickup_full: "",
      dest_short: "",
      dest_full: "",
    
      is_my_driver: "",
      my_driver: "",
      car: "",
    
      taseron: "",
      taseron_hakedis: 0,
      taseron_currency: "",
    
    });
  }

  ngOnInit(): void {
      this.getAgencies();
  }

  getAgencies(){
    this.agencyService.getAgencies().subscribe({
      next: (agencies: Agency[]) => {
        console.log("Fetched Agencies successfully");
        console.log(agencies);
        this.agencies = agencies;
      }, 
      error: (error: any) => {
        console.log("Error happened when fetching agencies");
        console.log(error);
      }
    });
  }

  onSubmit(){
    console.log("Form submitted");
    console.log(this.reservationForm?.value);
    this.reservationService.createReservation(this.reservationForm.value).subscribe({
      next: (reservation: Reservation) => {
        console.log("Reservation created successfully");
        console.log(reservation);
      },
      error: (error: any) => {
        console.log("Error happened when creating reservation");
        console.log(error);
      }
    });
  }
}
