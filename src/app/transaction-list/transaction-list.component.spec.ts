import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../Transaction';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let transactionService: TransactionService;
  let router: Router;

  const mockTransactionService = {
    getTransactions: jasmine.createSpy('getTransactions').and.returnValue([
      { id: 1, date: '2024-07-01', description: 'Test Income', amount: 100, type: 'income' },
      { id: 2, date: '2024-07-02', description: 'Test Expense', amount: 50, type: 'expense' }
    ]),
    deleteTransaction: jasmine.createSpy('deleteTransaction')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionListComponent],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize transactions on init', () => {
    component.ngOnInit();
    expect(transactionService.getTransactions).toHaveBeenCalled();
    expect(component.transactions.length).toBe(2);
    expect(component.filteredTransactions.length).toBe(2);
  });

  it('should filter transactions by type', () => {
    component.filter.type = 'income';
    component.applyFilter();
    expect(component.filteredTransactions.length).toBe(1);
    expect(component.filteredTransactions[0].type).toBe('income');
  });

  it('should filter transactions by date range', () => {
    component.filter.dateFrom = '2024-07-01';
    component.filter.dateTo = '2024-07-01';
    component.applyFilter();
    expect(component.filteredTransactions.length).toBe(1);
    expect(new Date(component.filteredTransactions[0].date)).toEqual(new Date('2024-07-01'));
  });

  it('should navigate to edit transaction', () => {
    const transaction: Transaction = { id: 1, date: '2024-07-01', description: 'Test', amount: 100, type: 'income' };
    component.editTransaction(transaction);
    expect(router.navigate).toHaveBeenCalledWith(['/edit-transaction', 1]);
  });

  it('should delete a transaction', () => {
    component.deleteTransaction(1);
    expect(transactionService.deleteTransaction).toHaveBeenCalledWith(1);
    expect(transactionService.getTransactions).toHaveBeenCalled();
  });
});
