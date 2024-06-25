import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { DriverService } from '../services/driver.service';
import { Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.scss'
})
export class DriverFormComponent implements OnInit{

  driverForm: FormGroup;
  error_messages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService, 
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private driverService: DriverService,
  ) { 
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.clearMessages();
  }

  submitForm() {
    if (this.driverForm.valid) {
      this.driverService.createDriver(this.driverForm.value).subscribe({
        next: (driver) => {
          console.log('Driver created:', driver);
          this.dialogRef.close(driver);
        },
        error: (error) => {
          console.error('Error creating driver:', error);
          this.error_messages = error.error.errors;
          this.messageService.add({severity:'error', summary:'Error', detail: error});
        }
      });
    }
  }

  clearMessages() {
    this.error_messages = [];
  }



}
