export enum View {
  DASHBOARD = 'DASHBOARD',
  SEND = 'SEND',
  RECEIVE = 'RECEIVE',
  HISTORY = 'HISTORY',
  ORACLE = 'ORACLE',
  CARD = 'CARD',
  REFERRAL = 'REFERRAL',
  PROFILE = 'PROFILE'
}

export type CurrencyCode = 'BTC' | 'ETH' | 'XMR' | 'USDT' | 'USDC';

export interface Asset {
  code: CurrencyCode;
  name: string;
  balance: number;
  price: number;
  change24h: number; // Percentage
  network: string;
  color?: string;
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  currency: CurrencyCode;
  date: string;
  address: string;
  status: 'confirmed' | 'pending';
  fiatValue: number;
}

export interface CardTransaction {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  date: string;
  category: string;
  status: 'completed' | 'pending' | 'declined';
}

export interface PriceData {
  time: string;
  price: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}