import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CarType } from '../models/car-type.model';
import { CarTypeService } from '../services/car-type.service';

@Component({
  selector: 'app-car-type-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './car-type-list.component.html',
  styleUrl: './car-type-list.component.scss'
})
export class CarTypeListComponent implements OnInit {
  loading: boolean = false;
  car_types: CarType[] = [];

  constructor(
    private carTypeService: CarTypeService, 
  ) {}

  ngOnInit() {
    this.getCarTypes();
  }

  getCarTypes() {
    this.loading = true;
    this.carTypeService.getCarTypes().subscribe({
      next: (carTypes: CarType[]) => {
        console.log('Fetched CarTypes successfully: ', carTypes);
        this.car_types = carTypes;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error fetching CarTypes: ', error)
        this.loading = false;
      }
    });
  }
}
