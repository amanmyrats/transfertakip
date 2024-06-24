import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Agency } from '../models/agency.model';
import { AgencyService } from '../services/agency.service';

@Component({
  selector: 'app-agency-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.scss'
})
export class AgencyListComponent implements OnInit {
  agencies: Agency[] = [];
  loading: boolean = false;

  constructor(
    private agencyService: AgencyService
  ) { }

  ngOnInit(): void {
    this.getAgencies();
  }

  getAgencies() {
    this.loading = true;
    this.agencyService.getAgencies().subscribe({
      next: (agencies: Agency[]) => {
        this.agencies = agencies;
        console.log('Successfully fetched Agencies' + this.agencies);
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    });
  }
}
