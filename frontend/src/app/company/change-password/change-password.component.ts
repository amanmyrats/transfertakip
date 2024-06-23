import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    PanelModule, 
    FormsModule, 
    ReactiveFormsModule, 
    InputTextModule, 
    PasswordModule, 
    ButtonModule, 
    CommonModule, 
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent  implements OnInit {
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder
    ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.passwordForm.valid) {
      // Logic to handle form submission (e.g., send data to backend)
      console.log('Form submitted with values:', this.passwordForm.value);
      // Reset form after submission (optional)
      this.passwordForm.reset();
    }
  }

  // passwordMatchValidator(control: AbstractControl): any {
  //   const newPassword = control.get('newPassword')?.value;
  //   const confirmPassword = control.get('confirmPassword')?.value;
  //   if (newPassword !== confirmPassword) {
  //     control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  //   } else {
  //     return null;
  //   }
  // }
}