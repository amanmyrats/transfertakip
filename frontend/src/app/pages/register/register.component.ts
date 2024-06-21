import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SubscriptionType } from '../../company/models/subscription-type.model';
import { SubscriptionTypeService } from '../../company/services/subscription-type.service';
import {  DropdownModule } from 'primeng/dropdown';
import { CompanyService } from '../../company/services/company.service';
import { Company } from '../../company/models/company.model';

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
  companyForm: FormGroup;
  owner_form: FormGroup;
  subscription_form: FormGroup;
  subscriptionTypes: SubscriptionType[] = [];

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private subscriptionTypeService: SubscriptionTypeService,
    private companyService: CompanyService,
  ) { 

    this.owner_form = this.fb.group({
      first_name: ['', Validators.required]
    });
    this.subscription_form = this.fb.group({
      subscription_type: ['', Validators.required]
    });

    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      owner: this.owner_form,
      contact_phone: ['', Validators.required],
      contact_email: ['', Validators.required],
      subscription: this.subscription_form,
    });
  }

  onRegister() {
    if (this.companyForm.valid) {
      // Handle registration logic here
      console.log('RegistrationForm:', this.companyForm.value);
      this.companyService.createTrialCompany(this.companyForm.value).subscribe({
        next: (company: Company) => {
          console.log('Company trial has been created successfully');
          console.log(company);
        }, 
        error: (err: any) => {
          console.log("Error happened when creating trial company");
          console.log(err);
        }
      });

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