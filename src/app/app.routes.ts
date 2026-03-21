import { Routes } from '@angular/router';
import { Login } from './layout/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Layout } from './layout/admin/layout';
import { Pos } from './features/pos/pos';
import { GeneratePayment } from './features/generate-payment/generate-payment';
import { Finance } from './features/finance/finance';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {path: "", redirectTo: 'login', pathMatch: "full"},
  { path: 'login', component: Login },
  { 
    path: 'layout', 
    // canActivate: [authGuard],
    component: Layout,
    children: [
      {path: "", redirectTo: 'dashboard', pathMatch: "full"},
      { path: 'dashboard', component: Dashboard },
      { path: 'pos', component: Pos },
      { path: 'generate-payment', component: GeneratePayment },
      { path: 'finance', component: Finance }
    ]
  },
  // { path: '**', redirectTo: '' }
];
