import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [
    ButtonModule, 

  ],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss'
})
export class ActionButtonsComponent implements OnInit{
  @Input() obj: any;
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate() {
    this.updateEmitter.emit(this.obj);
  }

  onDelete() {
    this.deleteEmitter.emit(this.obj.id);
  }
}
