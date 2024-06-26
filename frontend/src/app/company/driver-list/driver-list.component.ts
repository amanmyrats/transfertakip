import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Driver } from '../models/driver.model';
import { DriverService } from '../services/driver.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DriverFormComponent } from '../driver-form/driver-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { FilterSearchToolbarComponent } from '../../components/filter-search-toolbar/filter-search-toolbar.component';
import { HttpErrorPrinterService } from '../../services/http-error-printer.service';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [
    TableModule, 
    ToastModule, 
    DriverFormComponent, 
    InputTextModule, 
    ConfirmDialogModule,
    ActionButtonsComponent, 
    FilterSearchToolbarComponent
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService,
    HttpErrorPrinterService, 
  ],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss'
})
export class DriverListComponent  implements OnInit {
  drivers: Driver[] = [];
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;

  constructor(
    private driverService: DriverService, 
    public dialogService: DialogService,
    public messageService: MessageService, 
    private confirmationService: ConfirmationService, 
    private httpErrorPrinter: HttpErrorPrinterService
  ) { }

  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers() {
    this.loading = true;
    this.driverService.getDrivers().subscribe({
      next: (drivers: Driver[]) => {
        this.drivers = drivers;
        console.log('Successfully fetched Drivers');
        console.log(this.drivers);
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  updateObj(driver: Driver) {
    this.showForm(driver);
  }

  createObj() {
    this.showForm();
  }

  deleteObj(id: string) {
    this.confirmationService.confirm({
      message: 'Silmek istediğinizden emin misiniz?',
      header: 'Silme İşlemi',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel: "Sil",
      rejectLabel: "Vazgeç",
      dismissableMask: true, 

      accept: () => {
        this.driverService.deleteDriver(id).subscribe({
          next: (res: any) => {
            this.messageService.add(
              {severity:'success', summary:'Başarılı', detail:'Başarıyla silindi!'});
            this.getDrivers();
          },
          error: (err: HttpErrorResponse) => {
            this.httpErrorPrinter.printHttpError(err);
          }
        });
      }
    });

  }

  search() {
    console.log('Searching...');
  } 

  showForm(driver: Driver | null = null) {
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
        this.messageService.add(
          {severity:'success', summary:'Success', detail:'Driver added successfully'});
        this.getDrivers();
      }
    });
  }

}
