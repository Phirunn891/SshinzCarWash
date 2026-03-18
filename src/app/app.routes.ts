import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { Pos } from './pos/pos';
import { GeneratePayment } from './generate-payment/generate-payment';
import { Finance } from './finance/finance';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Login },
  { 
    path: '', 
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
      { path: 'pos', component: Pos, canActivate: [authGuard] },
      { path: 'generate-payment', component: GeneratePayment, canActivate: [authGuard] },
      { path: 'finance', component: Finance, canActivate: [authGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];
