import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../Transaction';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let transactionService: TransactionService;

  const mockTransactionService = {
    getTransactions: jasmine.createSpy('getTransactions').and.returnValue([
      { id: 1, date: '2024-07-01', description: 'Income 1', amount: 100, type: 'income' },
      { id: 2, date: '2024-07-02', description: 'Expense 1', amount: 50, type: 'expense' },
      { id: 3, date: '2024-07-03', description: 'Income 2', amount: 200, type: 'income' },
      { id: 4, date: '2024-07-04', description: 'Expense 2', amount: 100, type: 'expense' },
      { id: 5, date: '2024-07-05', description: 'Income 3', amount: 300, type: 'income' },
      { id: 6, date: '2024-07-06', description: 'Expense 3', amount: 150, type: 'expense' }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate summary correctly', () => {
    component.calculateSummary();
    expect(component.totalIncome).toBe(600); // 100 + 200 + 300
    expect(component.totalExpenses).toBe(300); // 50 + 100 + 150
    expect(component.currentBalance).toBe(300); // 600 - 300
  });

  it('should get recent transactions correctly', () => {
    component.getRecentTransactions();
    expect(component.recentTransactions.length).toBe(5);
    expect(component.recentTransactions[0].id).toBe(2);
    expect(component.recentTransactions[4].id).toBe(6);
  });

  it('should call calculateSummary and getRecentTransactions on init', () => {
    spyOn(component, 'calculateSummary');
    spyOn(component, 'getRecentTransactions');

    component.ngOnInit();

    expect(component.calculateSummary).toHaveBeenCalled();
    expect(component.getRecentTransactions).toHaveBeenCalled();
  });
});
