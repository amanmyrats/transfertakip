import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-shared-toolbar',
  standalone: true,
  imports: [
    ToolbarModule, 
    ButtonModule, 
    SplitButtonModule,
    InputTextModule, 
  ],
  templateUrl: './shared-toolbar.component.html',
  styleUrl: './shared-toolbar.component.scss'
})
export class SharedToolbarComponent implements OnInit {
  @Output() createEmitter: EventEmitter<any> = new EventEmitter();
  @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
  items: MenuItem[] | undefined;

  constructor() { }

  ngOnInit(): void {
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

  create(): void {
    this.createEmitter.emit();
  }

  search(): void {
    this.searchEmitter.emit();
  }
}
