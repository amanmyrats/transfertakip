import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  loading: boolean = false;
  constructor(
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses() {
    this.loading = true;
    this.expenseService.getExpenses().subscribe({
      next: (expenses: Expense[]) => {
        this.expenses = expenses;
        this.loading = false;
        console.log(this.expenses);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }
}
