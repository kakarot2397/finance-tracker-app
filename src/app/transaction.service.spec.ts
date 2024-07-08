import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { Transaction } from './Transaction';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a transaction and assign an ID', () => {
    const transaction: Transaction = { id: 0, date: new Date().toString(), description: 'Test', amount: 100, type: 'income' };
    service.addTransaction(transaction);
    const transactions = service.getTransactions();
    expect(transactions.length).toBe(1);
    expect(transactions[0].id).toBe(1);
  });

  it('should update a transaction', () => {
    const transaction: Transaction = { id: 0, date: Date().toString(), description: 'Test', amount: 100, type: 'income' };
    service.addTransaction(transaction);

    const updatedTransaction: Transaction = { id: 1, date: new Date().toString(), description: 'Updated Test', amount: 200, type: 'income' };
    service.updateTransaction(updatedTransaction);

    const transactions = service.getTransactions();
    expect(transactions[0].description).toBe('Updated Test');
    expect(transactions[0].amount).toBe(200);
  });

  it('should delete a transaction', () => {
    const transaction1: Transaction = { id: 0, date: new Date().toString(), description: 'Test1', amount: 100, type: 'income' };
    const transaction2: Transaction = { id: 0, date: new Date().toString(), description: 'Test2', amount: 200, type: 'expense' };
    service.addTransaction(transaction1);
    service.addTransaction(transaction2);

    service.deleteTransaction(1);

    const transactions = service.getTransactions();
    expect(transactions.length).toBe(1);
    expect(transactions[0].description).toBe('Test2');
  });

  it('should get a transaction by ID', () => {
    const transaction: Transaction = { id: 0, date: new Date().toString(), description: 'Test', amount: 100, type: 'income' };
    service.addTransaction(transaction);

    const fetchedTransaction = service.getTransactionById(1);
    expect(fetchedTransaction).toBeTruthy();
    expect(fetchedTransaction?.description).toBe('Test');
  });

  it('should return undefined for a non-existent transaction ID', () => {
    const fetchedTransaction = service.getTransactionById(999);
    expect(fetchedTransaction).toBeUndefined();
  });
});