import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    ButtonModule, 
    InputTextModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router
  ) { }

  onRegister() {
    if (this.password === this.confirmPassword) {
      // Handle registration logic here
      console.log('Username:', this.username);
      console.log('Email:', this.email);
      console.log('Password:', this.password);
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
}