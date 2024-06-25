import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Driver } from '../models/driver.model';
import { DriverService } from '../services/driver.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { DriverFormComponent } from '../driver-form/driver-form.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [
    TableModule, 
    ToastModule, 
    DriverFormComponent, 
    ToolbarModule, 
    ButtonModule, 
    SplitButtonModule, 
    InputTextModule
  ],
  providers: [
    DialogService,
    MessageService,
  ],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss'
})
export class DriverListComponent  implements OnInit {
  drivers: Driver[] = [];
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;
  items: MenuItem[] | undefined;

  constructor(
    private driverService: DriverService, 
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getDrivers();
    this.items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];
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

  showForm(driver: Driver = {} as Driver) {
    this.ref = this.dialogService.open(DriverFormComponent, {
      header: 'Add Driver',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      data: {
        driver: driver
      }
    });

    this.ref.onClose.subscribe((driver: Driver) => {
      if (driver) {
        this.messageService.add({severity:'success', summary:'Success', detail:'Driver added successfully'});
        this.getDrivers();
      }
    });
  }

}
