import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'customers',
    loadComponent: () =>
      import('./customers-table/customers-table.component').then(m => m.CustomersTableComponent),
  },
  {
    path: 'customers/new',
    loadComponent: () =>
      import('./customer-form/customer-form.component').then(m => m.CustomerFormComponent),
  },
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
];
