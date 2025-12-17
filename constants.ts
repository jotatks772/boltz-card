import { Transaction, PriceData, CardTransaction, Asset } from './types';

export const INITIAL_ASSETS: Asset[] = [
  {
    code: 'BTC',
    name: 'Bitcoin',
    balance: 1.24500000,
    price: 64500.00,
    change24h: 2.4,
    network: 'Bitcoin Core',
    color: 'text-orange-500'
  },
  {
    code: 'ETH',
    name: 'Ethereum',
    balance: 8.50000000,
    price: 3200.00,
    change24h: -1.2,
    network: 'Ethereum Mainnet',
    color: 'text-indigo-400'
  },
  {
    code: 'XMR',
    name: 'Monero',
    balance: 150.00000000,
    price: 165.50,
    change24h: 5.1,
    network: 'Monero Network',
    color: 'text-gray-400'
  },
  {
    code: 'USDT',
    name: 'Tether',
    balance: 5420.00,
    price: 1.00,
    change24h: 0.01,
    network: 'ERC-20',
    color: 'text-emerald-400'
  },
  {
    code: 'USDC',
    name: 'USD Coin',
    balance: 2100.00,
    price: 1.00,
    change24h: 0.00,
    network: 'ERC-20',
    color: 'text-blue-400'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1a2b3c',
    type: 'received',
    amount: 0.045,
    currency: 'BTC',
    date: 'Hoje, 14:30',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    status: 'confirmed',
    fiatValue: 2850.50
  },
  {
    id: 'tx-eth-1',
    type: 'received',
    amount: 2.5,
    currency: 'ETH',
    date: 'Hoje, 10:15',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    status: 'confirmed',
    fiatValue: 8000.00
  },
  {
    id: 'tx-xmr-1',
    type: 'sent',
    amount: 10.0,
    currency: 'XMR',
    date: 'Ontem, 22:00',
    address: '44AFFq5kSiGBoZ4NMDwYtN18...',
    status: 'confirmed',
    fiatValue: 1650.00
  },
  {
    id: 'tx-4d5e6f',
    type: 'sent',
    amount: 0.012,
    currency: 'BTC',
    date: '23 Out, 09:15',
    address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    status: 'confirmed',
    fiatValue: 760.20
  },
  {
    id: 'tx-usdt-1',
    type: 'received',
    amount: 5000.00,
    currency: 'USDT',
    date: '20 Out, 11:20',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    status: 'pending',
    fiatValue: 5000.00
  }
];

export const MOCK_CARD_TRANSACTIONS: CardTransaction[] = [
  { id: 'c1', merchant: 'AWS EMEA', amount: 45.00, currency: 'USD', date: 'Hoje, 10:23', category: 'Infraestrutura', status: 'pending' },
  { id: 'c2', merchant: 'Starbucks Coffee', amount: 5.50, currency: 'USD', date: 'Ontem, 14:30', category: 'Alimentação', status: 'completed' },
  { id: 'c3', merchant: 'Apple Store', amount: 1299.00, currency: 'USD', date: '22 Out', category: 'Eletrônicos', status: 'completed' },
  { id: 'c4', merchant: 'Netflix', amount: 15.99, currency: 'USD', date: '20 Out', category: 'Assinaturas', status: 'completed' },
  { id: 'c5', merchant: 'Uber Technologies', amount: 24.50, currency: 'USD', date: '19 Out', category: 'Transporte', status: 'completed' },
];

export const MOCK_PRICE_DATA: PriceData[] = [
  { time: '00:00', price: 105000 },
  { time: '04:00', price: 106200 },
  { time: '08:00', price: 104800 },
  { time: '12:00', price: 108500 },
  { time: '16:00', price: 109100 },
  { time: '20:00', price: 107800 },
  { time: '24:00', price: 108500 },
];