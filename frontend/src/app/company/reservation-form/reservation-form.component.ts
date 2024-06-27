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
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpErrorPrinterService } from '../../services/http-error-printer.service';
import { MessagesModule } from 'primeng/messages';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CurrencyService } from '../services/currency.service';
import { CarService } from '../services/car.service';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CarTypeService } from '../services/car-type.service';


@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [DropdownModule, InputTextModule, ButtonModule, ReactiveFormsModule, 
    MessagesModule, SelectButtonModule, CalendarModule, FloatLabelModule, 
    InputNumberModule, InputTextareaModule
   ],
   providers: [
    HttpErrorPrinterService,
   ],
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


  isNakitOptions: any[] = [
    {label: 'Nakit', value: true},
    {label: 'Cari', value: false},
  ];
  isMyDriverOptions: any[] = [
    {label: 'My Driver', value: true},
    {label: 'Taşeron', value: false},
  ];
  transferTypes: any[] = [];

  reservation: Reservation | null = null;
  reservationForm: FormGroup;

  constructor(
    private agencyService: AgencyService,
    private currencyService: CurrencyService,
    private carService: CarService,
    private carTypeService: CarTypeService,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private httpErrorPrinter: HttpErrorPrinterService
    
  ){
    this.transferTypes = this.reservationService.getTransferTypes();

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
      this.getCurrencies();
      this.getCars();
      this.getCarTypes();
      this.reservation = this.config.data.reservation;
      if (this.reservation) {
        this.reservationForm.patchValue(this.reservation);
      }
  }

  getAgencies(){
    this.agencyService.getAgencies().subscribe({
      next: (agencies: Agency[]) => {
        console.log("Fetched Agencies successfully");
        console.log(agencies);
        this.agencies = agencies;
      }, 
      error: (error: any) => {
        this.httpErrorPrinter.printHttpError(error);
      }
    });
  }

  onSubmit(){
    console.log("Form submitted");
    console.log(this.reservationForm?.value);
    if (this.reservationForm.valid) {
      if (this.reservation) {
        this.updateReservation();
      } else {
        this.createReservation();
      }
    }
   
  }

  createReservation(){
    this.reservationService.createReservation(this.reservationForm.value).subscribe({
      next: (reservation: Reservation) => {
        console.log("Reservation created successfully");
        console.log(reservation);
        this.dialogRef.close(reservation);
      },
      error: (error: any) => {
        this.httpErrorPrinter.printHttpError(error);
      }
    });
  }

  updateReservation(){
    this.reservationService.updateReservation(
      this.reservation?.id!, this.reservationForm.value).subscribe({
      next: (reservation: Reservation) => {
        console.log("Reservation updated successfully");
        console.log(reservation);
        this.dialogRef.close(reservation);
      },
      error: (error: any) => {
        this.httpErrorPrinter.printHttpError(error);
      }
    });
  }

  getCurrencies(){
    this.currencyService.getCurrencies().subscribe({
      next: (currencies: Currency[]) => {
        console.log("Fetched Currencies successfully");
        console.log(currencies);
        this.currencies = currencies;
      },
      error: (error: any) => {
        this.httpErrorPrinter.printHttpError(error);
      }
    });
  }

  getCars(): void {
    this.carService.getCars().subscribe({
      next: (cars: Car[]) => {
        console.log("Fetched Cars successfully");
        console.log(cars);
        this.cars = cars;
      },
      error: (error: any) => {
        this.httpErrorPrinter.printHttpError(error);
      }
    });
  }

  getCarTypes(): void {
    this.carTypeService.getCarTypes().subscribe({
      next: (carTypes: CarType[]) => {
        console.log("Fetched Car Types successfully");
        console.log(carTypes);
        this.carTypes = carTypes;
      },
      error: (error: any) => {
        this.httpErrorPrinter.printHttpError(error);
      }
    });
  }
}
