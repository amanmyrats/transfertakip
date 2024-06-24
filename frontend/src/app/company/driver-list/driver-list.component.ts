import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Driver } from '../models/driver.model';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss'
})
export class DriverListComponent  implements OnInit {
  drivers: Driver[] = [];
  loading: boolean = false;

  constructor(
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers() {
    this.loading = true;
    this.driverService.getDrivers().subscribe({
      next: (drivers: Driver[]) => {
        this.drivers = drivers;
        console.log('Successfully fetched Drivers' + this.drivers);
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    });
  }
}
