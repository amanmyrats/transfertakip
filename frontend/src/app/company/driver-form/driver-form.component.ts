import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { DriverService } from '../services/driver.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpErrorResponse } from '@angular/common/http';
import { Driver } from '../models/driver.model';
import { HttpErrorPrinterService } from '../../services/http-error-printer.service';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [
    PanelModule, 
    MessagesModule, 
    FormsModule, 
    ReactiveFormsModule, 
    InputTextModule,
    ButtonModule
  ],
  providers: [
    HttpErrorPrinterService
  ],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.scss'
})
export class DriverFormComponent implements OnInit{

  driverForm: FormGroup;
  driver: Driver | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private driverService: DriverService,
    private httpErrorPrinter: HttpErrorPrinterService
  ) { 
    this.driverForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.driver = this.config.data.driver;
    if (this.driver) {
      this.driverForm.patchValue(this.driver);
    }
  }

  submitForm() {
    if (this.driverForm.valid) {
      if (this.driver) {
        console.log('Updating driver:', this.driverForm.value);
        // Update the driver
        this.driverService.updateDriver(this.driver?.id!, this.driverForm.value).subscribe({
          next: (driver) => {
            console.log('Driver updated:', driver);
            this.dialogRef.close(driver);
          },
          error: (err: HttpErrorResponse) => {
            this.httpErrorPrinter.printHttpError(err);
          }
        });
        
      }
      else {
        // Create a new driver
        console.log('Creating driver:', this.driverForm.value);
        this.driverService.createDriver(this.driverForm.value).subscribe({
          next: (driver) => {
            console.log('Driver created:', driver);
            this.dialogRef.close(driver);
          },
          error: (err: HttpErrorResponse) => {
            this.httpErrorPrinter.printHttpError(err);
          }
        });
      }
    }
  }


}
