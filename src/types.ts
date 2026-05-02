/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CashbackStatus = 'Tracked' | 'Validating' | 'Confirmed' | 'Payable' | 'Issue';

export interface Merchant {
  id: string;
  name: string;
  logo: string;
  category: 'Electronics' | 'Fashion' | 'Travel' | 'Lifestyle' | 'Food & Dining' | 'Groceries';
}

export interface Offer {
  id: string;
  merchantId: string;
  cashbackPercentage: number;
  description: string;
  terms: string[];
  isFeatured?: boolean;
  isLimitedTime?: boolean;
  expiresAt?: string;
  label?: string;
}

export interface Transaction {
  id: string;
  merchantId: string;
  amount: number;
  cashbackAmount: number;
  status: CashbackStatus;
  date: string;
  estimatedPayoutDate: string;
  orderId?: string;
}

export interface Claim {
  id: string;
  transactionId?: string;
  orderId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}
