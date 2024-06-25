import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ExpenseType } from '../models/expense-type';
import { ExpenseTypeService } from '../services/expense-type.service';

@Component({
  selector: 'app-expense-type-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './expense-type-list.component.html',
  styleUrl: './expense-type-list.component.scss'
})
export class ExpenseTypeListComponent implements OnInit {
  loading: boolean = false;
  expense_types: ExpenseType[] = [];

  constructor(
    private expenseTypeService: ExpenseTypeService,
  ) { }

  ngOnInit(): void {
    this.getExpenseTypes();
  }

  getExpenseTypes() {
    this.loading = true;
    this.expenseTypeService.getExpenseTypes().subscribe({
      next: (expense_types: ExpenseType[]) => {
        console.log('Fetched ExpenseTypes successfully: ', expense_types);
        this.expense_types = expense_types;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error fetching ExpenseTypes: ', error)
        this.loading = false;
      }
    });
  }

}
