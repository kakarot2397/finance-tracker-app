import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from './Transaction';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions: Transaction[]=[];
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  constructor() { }

  getTransactions()
  {
    return this.transactions;
  }
  addTransaction(transaction: Transaction)
  {
    transaction.id = this.transactions.length + 1; // Assign a new ID
    this.transactions.push(transaction);
    this.transactionsSubject.next(this.transactions);
  }

  updateTransaction(updatedTransaction: Transaction): void {
    const index = this.transactions.findIndex(t => t.id === updatedTransaction.id);
    if (index !== -1) {
      this.transactions[index] = updatedTransaction;
    }
  }
  deleteTransaction(id: number | null)
  {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.transactionsSubject.next(this.transactions);
  }
  getTransactionById(id: number): Transaction | undefined
  {
    return this.transactions.find(t => t.id === id);
  }
}
