import { Currency } from "./currency.model";

export class Expense {
    id?: string;
    name?: string;
    amount?: number;
    currency?: string;
    currency_obj?: Currency
}
