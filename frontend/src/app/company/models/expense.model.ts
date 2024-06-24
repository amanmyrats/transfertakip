import { Currency } from "./currency.model";
import { ExpenseType } from "./expense-type";

export class Expense {
    id?: string;
    expense_type?: ExpenseType;
    amount?: number;
    currency?: string;
    currency_obj?: Currency
}
