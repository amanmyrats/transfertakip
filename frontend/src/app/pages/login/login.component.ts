import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm : FormGroup;
  
  constructor(
    private router: Router, 
    private authService: AuthService, 
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
      // Redirect to company page
      console.log('Redirect to company page');
      this.router.navigate(['/company']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.controls['email'].value, 
        this.loginForm.controls['password'].value
      ).subscribe((success) => {
        if (success) {
          // Redirect to company page
          console.log('Redirect to company page');
          this.router.navigate(['/company']);
        } else {
          // Show error message
          console.log('Login failed');
        }
      });
    } else {
      // Show error message
      console.log('Invalid form');
    }
  }

  onRegister() {
    // Redirect to register page
    console.log('Redirect to register page');
    this.router.navigate(['/register']);
  }

  onBackToMain() {
    // Redirect to main page
    console.log('Redirect to main page');
    this.router.navigate(['/']);
  }
}
