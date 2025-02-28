import { Injectable } from '@angular/core';
import { IExpense } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expenses:IExpense[] = [];

  constructor() { 
    this.addExpense({'price':10, 'title':'title1','description':'description 1'});
    this.addExpense({'price':20, 'title':'title 2','description':'description 2'});
    this.addExpense({'price':30, 'title':'title 3','description':'description 3'});
    this.addExpense({'price':40, 'title':'title 4','description':'description 4'});
  }

  getAllExpenses(): IExpense[]{
    return this.expenses;
  }

  addExpense(expense:IExpense){
    expense.key = ""+this.expenses.length;
    this.expenses.push(expense);
  }

  getExpense(key:string){
    return this.expenses.find(expense => expense.key === key);
  }

  updateExpense(key: string, expense: IExpense){
    let index = this.expenses.findIndex(expense => expense.key === key);
    expense.key = key;
    this.expenses[index] = expense;
  }

  deleteExpense(key:string){
    let index:number =  this.expenses.findIndex(expense => expense.key === key);
    this.expenses.splice(index, 1);
  }
  


}
