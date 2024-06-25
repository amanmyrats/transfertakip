import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent implements OnInit{
  loading: boolean = false;
  cars: Car[] = [];

  constructor(
    private carService: CarService,
  ) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.loading = true;
    this.carService.getCars().subscribe({
      next: (cars: Car[]) => {
        console.log('Fetched Cars successfully: ', cars);
        this.cars = cars;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error fetching Cars: ', error)
        this.loading = false;
      }
    });
  }

}
