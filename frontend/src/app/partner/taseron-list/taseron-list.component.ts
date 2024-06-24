import { Component, OnInit } from '@angular/core';
import { TaseronService } from '../services/taseron.service';
import { Taseron } from '../models/taseron.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-taseron-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './taseron-list.component.html',
  styleUrl: './taseron-list.component.scss'
})
export class TaseronListComponent  implements OnInit {
  taserons: Taseron[] = [];
  loading: boolean = false;

  constructor(
    private taseronService: TaseronService
  ) { }

  ngOnInit(): void {
    this.getTaserons();
  }

  getTaserons() {
    this.loading = true;
    this.taseronService.getTaserons().subscribe({
      next: (taserons: Taseron[]) => {
        this.taserons = taserons;
        console.log('Successfully fetched Taserons' + this.taserons);
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    });
  }
}
