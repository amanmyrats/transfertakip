import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ToastModule } from 'primeng/toast';
import { DriverFormComponent } from '../driver-form/driver-form.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    TableModule, 
    ToastModule, 
    DriverFormComponent, 
    ToolbarModule, 
    ButtonModule, 
    SplitButtonModule, 
    InputTextModule
  ],
  providers: [
    DialogService,
    MessageService,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  loading: boolean = false;
  users: User[] = [];
  ref: DynamicDialogRef | undefined;
  items: MenuItem[] | undefined;

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    public messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getUsers();
    this.items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];
  }

  getUsers(){
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        console.log("Successfully fetched users");
        console.log(users);
        this.loading = false;
      },
      error: (error: any) => {
        console.log("Error happened when fetching users.");
        console.log(error);
        this.loading = false;
      }
    })
  }

  
  showForm(user: User = {} as User) {
    this.ref = this.dialogService.open(UserFormComponent, {
      header: 'Add User',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      data: {
        user: user
      }
    });

    this.ref.onClose.subscribe((user: User) => {
      if (user) {
        this.messageService.add({severity:'success', summary:'Success', detail:'User added successfully'});
        this.getUsers();
      }
    });
  }

}
