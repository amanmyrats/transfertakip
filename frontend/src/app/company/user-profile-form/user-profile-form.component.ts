import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-profile-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    InputTextModule,
    ButtonModule],
  templateUrl: './user-profile-form.component.html',
  styleUrl: './user-profile-form.component.scss'
})
export class UserProfileFormComponent  implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit(): void {
    // Simulate fetching user data from a backend or other source
    this.userForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      // Process the form data (e.g., save to backend)
      console.log('Form submitted with values:', this.userForm.value);
    } else {
      // Validate and display errors if necessary
      this.userForm.markAllAsTouched();
    }
  }
}