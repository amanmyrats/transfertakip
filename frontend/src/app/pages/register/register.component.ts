import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SubscriptionType } from '../../company/models/subscription-type.model';
import { SubscriptionTypeService } from '../../company/services/subscription-type.service';
import {  DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    ButtonModule, 
    InputTextModule, 
    FormsModule, 
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  subscriptionTypes: SubscriptionType[] = [];

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private subscriptionTypeService: SubscriptionTypeService,
  ) { 
    this.registerForm = this.fb.group({
      company_name: ['', Validators.required],
      owner_full_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      subscription_type: [''],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      // Handle registration logic here
      console.log('RegistrationForm:', this.registerForm.value);

    } else {
      console.error('Passwords do not match');
    }
  }
  
  onGotoLogin() {
    // Redirect to main page
    console.log('Redirect to login page');
    this.router.navigate(['/login']);
  }

  onBackToMain() {
    // Redirect to main page
    console.log('Redirect to main page');
    this.router.navigate(['/']);
  }

  getSubscriptionTypes() {
    this.subscriptionTypeService.getSubscriptionTypes().subscribe(
      (subscriptionTypes: SubscriptionType[]) => {
        this.subscriptionTypes = subscriptionTypes;
      },
      (error) => {
        console.error('Error fetching subscription types:', error);
      }
    );
  }
}