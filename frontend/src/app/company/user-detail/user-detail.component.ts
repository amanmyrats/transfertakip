import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
// import { IconType } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { UserProfileFormComponent } from '../user-profile-form/user-profile-form.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    AvatarModule, 
    ButtonModule, 
    FormsModule,
    PanelModule,
    InputTextModule, 
    UserProfileFormComponent
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent  implements OnInit {
  userProfile: any;
  user: any = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890'
  };
  constructor() { }

  ngOnInit() {
  }

  saveChanges() {
    // Implement save functionality here
    console.log('Saving changes...', this.user);
    // Example: You might want to send an HTTP request to save changes to backend
  }
}