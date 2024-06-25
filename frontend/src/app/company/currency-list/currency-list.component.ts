import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Currency } from '../models/currency.model';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.scss'
})
export class CurrencyListComponent implements OnInit {
  loading: boolean = false;
  currencies: Currency[] = [];

  constructor(
    private currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies() {
    this.loading = true;
    this.currencyService.getCurrencies().subscribe({
      next: (currencies: Currency[]) => {
        console.log('Fetched Currencies successfully: ', currencies);
        this.currencies = currencies;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error fetching Currencies: ', error)
        this.loading = false;
      }
    });
  }
}
