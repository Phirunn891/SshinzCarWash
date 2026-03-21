import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance.html',
  styleUrl: './finance.css',
})
export class Finance {
  stats = [
    { title: 'Total Revenue', value: '$45,280.00', trend: '+12.5%', icon: 'bi-wallet2', color: 'orange' },
    { title: 'Total Payroll', value: '$12,400.00', detail: '12 Employees', icon: 'bi-briefcase', color: 'orange' },
    { title: 'Net Profit', value: '$32,880.00', trend: '+15.3%', icon: 'bi-graph-up-arrow', color: 'orange' },
    { title: 'Cash on Hand', value: '$15,200.00', detail: 'Stable', icon: 'bi-bank', color: 'orange' }
  ];

  topEarners = [
    { name: 'Marcus Chen', role: 'Master Detailer', amount: '$3,420', count: '42 Services', avatar: 'https://i.pravatar.cc/150?img=11' },
    { name: 'Sarah Jenkins', role: 'Premium Wash', amount: '$2,850', count: '38 Services', avatar: 'https://i.pravatar.cc/150?img=5' },
    { name: 'David Smith', role: 'Ceramic Pro', amount: '$2,610', count: '15 Services', avatar: 'https://i.pravatar.cc/150?img=12' }
  ];

  transactions = [
    { date: 'Oct 24, 2023', time: '14:20 PM', service: 'Premium Full Detail', method: 'TRANSFER', status: 'COMPLETED', amount: '$180.00', color: 'orange' },
    { date: 'Oct 24, 2023', time: '12:15 PM', service: 'Basic Express Wash', method: 'CASH', status: 'COMPLETED', amount: '$45.00', color: 'white' },
    { date: 'Oct 23, 2023', time: '09:45 AM', service: 'Ceramic Coating', method: 'TRANSFER', status: 'COMPLETED', amount: '$550.00', color: 'purple' },
    { date: 'Oct 23, 2023', time: '16:30 PM', service: 'Interior Deep Clean', method: 'CASH', status: 'COMPLETED', amount: '$120.00', color: 'green' }
  ];
}
