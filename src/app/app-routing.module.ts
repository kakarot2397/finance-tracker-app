import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'add-transaction', component: TransactionFormComponent },  // Ensure this path matches the link in the navbar
  { path: 'edit-transaction/:id', component: TransactionFormComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
