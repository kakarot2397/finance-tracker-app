import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../Transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  filter = {
    type: '',
    dateFrom: '',
    dateTo: ''
  };

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
    this.filteredTransactions = this.transactions;
  }

  applyFilter(): void {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesType = !this.filter.type || transaction.type === this.filter.type;
      const matchesDateFrom = !this.filter.dateFrom || new Date(transaction.date) >= new Date(this.filter.dateFrom);
      const matchesDateTo = !this.filter.dateTo || new Date(transaction.date) <= new Date(this.filter.dateTo);
      return matchesType && matchesDateFrom && matchesDateTo;
    });
  }

  editTransaction(transaction: Transaction): void {
    this.router.navigate(['/edit-transaction', transaction.id]);
  }

  deleteTransaction(id: number|null): void {
    this.transactionService.deleteTransaction(id);
    this.transactions = this.transactionService.getTransactions();
    this.applyFilter();
  }
}
