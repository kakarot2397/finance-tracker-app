import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../Transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalIncome: number = 0;
  totalExpenses: number = 0;
  currentBalance: number = 0;
  recentTransactions: Transaction[] = [];
  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels = ['Income', 'Expenses'];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   { data: [0, 0], label: 'Amount' }
  // ];
  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.calculateSummary();
    this.getRecentTransactions();
  }

  calculateSummary(): void {
    const transactions = this.transactionService.getTransactions();
    this.totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + (t.amount == null ?0: t.amount), 0);
    this.totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + (t.amount == null ?0: t.amount),0);
    this.currentBalance = this.totalIncome - this.totalExpenses;
    // this.barChartData = [
    //   { data: [this.totalIncome, this.totalExpenses], label: 'Amount' }
    // ];
  }

  getRecentTransactions(): void {
    const transactions = this.transactionService.getTransactions();
    this.recentTransactions = transactions.slice(-5); // Get the last 5 transactions
  }
}
