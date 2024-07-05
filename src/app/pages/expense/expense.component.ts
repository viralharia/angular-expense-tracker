import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense } from '../../core/models/common.model';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  expenses:IExpense[] = [];
  totalExpenses: number = 0;
  constructor(private expenseService: ExpenseService, private router: Router){

  }

  ngOnInit(): void {
    this.expenses = this.expenseService.getAllExpenses();
  }

  editExpense(key: string){
    this.router.navigate(['/expense-form',key]);
  }

  removeExpense(key: string){
    this.expenseService.deleteExpense(key);
  }

}
