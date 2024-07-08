# PersonalFinanceTracker

## Overview
This Angular application serves as a personal finance tracker where users can manage their income and expenses conveniently. It provides features to add, edit, delete transactions, view financial summaries, and filter transactions based on date and type.

## Features
# Dashboard:

Display summary of total income, total expenses, and current balance.
Show recent transactions.
Transaction List:

Display a list of transactions with details like date, description, amount, and type (income/expense).
Filter transactions by date range and type.
Add/Edit Transaction:

Form for adding new transactions or editing existing ones.
Fields include Date, Description, Amount, and Type (income/expense).
Routing:

Use Angular Router for navigation between Dashboard, Transaction List, and Add/Edit Transaction pages.
State Management:

Utilize a service (TransactionService) to manage the state of transactions.
Styling:

Apply basic styling for a clean and user-friendly interface.
Optional Features
Implement charts to visualize income and expenses over time.
Export transactions as a CSV file.
Unit tests for key components and services.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
## Limitations

When you reload the web site the data will be lost as we are not saving the dat anywhere.

whike doing npm install  if you face error use the command npm install --force to install all the nodemodule please.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
