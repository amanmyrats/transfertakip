import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../services/user.service';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    PanelModule,
    FormsModule, 
    ReactiveFormsModule,
    MessagesModule, 
    ButtonModule, 
    InputTextModule, 
    DropdownModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
  
  userForm: FormGroup;
  roles: Role[] = [];
  error_messages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService, 
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private userService: UserService,
    private roleService: RoleService,
  ) { 
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: [''],
      role: [''],
    });
  }

  ngOnInit(): void {
    this.clearMessages();
    this.getRoles();
  }

  submitForm() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (user) => {
          console.log('User created:', user);
          this.dialogRef.close(user);
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.error_messages = error.error.errors;
          this.messageService.add({severity:'error', summary:'Error', detail: error});
        }
      });
    }
  }

  clearMessages() {
    this.error_messages = [];
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        console.log("Successfully fetched roles");
        console.log(roles);
      },
      error: (error: any) => {
        console.log("Error happened when fetching roles.");
        console.log(error);
      }
    });
  }
}
