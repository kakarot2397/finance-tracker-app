import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../Transaction';
@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  transaction: Transaction = { id: null, date: '', description: '', amount: null, type: 'income' };

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id= +idParam;
      const existingTransaction = this.transactionService.getTransactionById(id);
      if (existingTransaction) {
        this.transaction = existingTransaction;
      }
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.transaction.id) {
        this.transactionService.updateTransaction(this.transaction);
      } else {
        this.transactionService.addTransaction(this.transaction);
      }
      this.router.navigate(['/transactions']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/transactions']);
  }
}