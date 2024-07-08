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
  downloadCSV(): void {
    const csvContent = this.convertToCSV(this.filteredTransactions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.setAttribute('download', 'transactions.csv');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  convertToCSV(transactions: Transaction[]): string {
    const header = ['Date', 'Description', 'Amount', 'Type'];
    const rows = transactions.map(transaction =>
      `${transaction.date}, ${transaction.description}, ${transaction.amount}, ${transaction.type}`
    );
    return header.join(',') + '\n' + rows.join('\n');
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
