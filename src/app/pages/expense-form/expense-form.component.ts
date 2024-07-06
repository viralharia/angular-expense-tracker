import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../core/services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IExpense } from '../../core/models/common.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent implements OnInit{
  expenseForm!:FormGroup;
  expenseId: string = '';

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, 
    private router: Router, private activatedRoute:ActivatedRoute){
    this.expenseForm = this.fb.group({
      price: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next:(params) => {
        this.expenseId = params['id'];
        console.log("inside activated route..."+this.expenseId);
        if(this.expenseId !== ''){
          this.populateExpense(this.expenseId);
        }
      }
    })
  }

  onSubmit(){
    console.log(this.expenseForm.valid);
    if(this.expenseForm.valid){
      console.log(this.expenseForm.value);
      console.log("expenseID = "+this.expenseId);
      if(this.expenseId !== ''){
        this.expenseService.updateExpense(this.expenseId, this.expenseForm.value);
      }else{
        this.expenseService.addExpense(this.expenseForm.value);
      }
      this.expenseId = '';
      this.router.navigate(['/']);
    }else{
      this.expenseForm.markAsTouched();
    }
  }

  populateExpense(key: string){
    let expense:IExpense | undefined = this.expenseService.getExpense(key);
    console.log("inside populate expense, key = "+key+"expense = "+expense);
    if(expense !== undefined){
      this.expenseForm.patchValue(expense);
    }else{
      this.expenseId = '';
    }
    
  }

  
}
