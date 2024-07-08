import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { TransactionFormComponent } from './transaction-form.component';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../Transaction';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  let transactionService: TransactionService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const mockTransactionService = {
    getTransactionById: jasmine.createSpy('getTransactionById').and.callFake((id: number) => {
      if (id === 1) {
        return { id: 1, date: '2024-07-01', description: 'Test', amount: 100, type: 'income' } as Transaction;
      }
      return undefined;
    }),
    addTransaction: jasmine.createSpy('addTransaction'),
    updateTransaction: jasmine.createSpy('updateTransaction')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.callFake((key: string) => {
          if (key === 'id') {
            return '1';
          }
          return null;
        })
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionFormComponent],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load transaction if id is provided', () => {
    component.ngOnInit();
    expect(transactionService.getTransactionById).toHaveBeenCalledWith(1);
    expect(component.transaction).toEqual({ id: 1, date: '2024-07-01', description: 'Test', amount: 100, type: 'income' });
  });

  it('should add a new transaction on submit if id is not provided', () => {
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(null);
    component.transaction = { id: null, date: '2024-07-02', description: 'New Test', amount: 200, type: 'expense' };
    component.onSubmit({ valid: true } as NgForm);
    expect(transactionService.addTransaction).toHaveBeenCalledWith(component.transaction);
    expect(router.navigate).toHaveBeenCalledWith(['/transactions']);
  });

  it('should update an existing transaction on submit if id is provided', () => {
    component.transaction = { id: 1, date: '2024-07-01', description: 'Updated Test', amount: 150, type: 'income' };
    component.onSubmit({ valid: true } as NgForm);
    expect(transactionService.updateTransaction).toHaveBeenCalledWith(component.transaction);
    expect(router.navigate).toHaveBeenCalledWith(['/transactions']);
  });

  it('should navigate to transactions on cancel', () => {
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/transactions']);
  });
});
