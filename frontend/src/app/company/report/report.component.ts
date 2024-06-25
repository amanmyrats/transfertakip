import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';

interface DashboardData {
  totalReservations: number;
  totalLoans: number;
  totalDrivers: number;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent  implements OnInit {

  dashboardData: DashboardData | undefined;

  ngOnInit(): void {
    // Replace this with your logic to fetch data from your backend API
    this.dashboardData = {
      totalReservations: 123,
      totalLoans: 45,
      totalDrivers: 78
    };
  }
}