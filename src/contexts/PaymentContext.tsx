'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountHolderName: string;
}

interface PaymentContextType {
  // Balance
  totalEarnings: number;
  pendingEarnings: number;
  withdrawnEarnings: number;
  availableBalance: number;

  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  getTransactionById: (id: string) => Transaction | undefined;
  getTransactionsByType: (type: 'credit' | 'debit') => Transaction[];
  getTransactionsByStatus: (status: Transaction['status']) => Transaction[];

  // Bank Accounts
  bankAccounts: BankAccount[];
  addBankAccount: (account: Omit<BankAccount, 'id'>) => void;
  removeBankAccount: (id: string) => void;
  getBankAccountById: (id: string) => BankAccount | undefined;

  // Actions
  withdrawFunds: (amount: number, accountId: string) => Promise<void>;
  addEarnings: (amount: number, description: string) => void;
  updatePendingEarnings: (amount: number) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Mock initial data
const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 25000,
    description: 'Campaign Payment - TechGiant',
    date: new Date().toISOString().split('T')[0],
    status: 'completed',
    reference: 'TXN' + Date.now().toString().slice(-6),
  },
];

const initialBankAccounts: BankAccount[] = [
  {
    id: '1',
    bankName: 'HDFC Bank',
    accountNumber: '****1234',
    ifsc: 'HDFC0001234',
    accountHolderName: 'John Doe',
  },
];

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [totalEarnings, setTotalEarnings] = useState(185000);
  const [pendingEarnings, setPendingEarnings] = useState(32000);
  const [withdrawnEarnings, setWithdrawnEarnings] = useState(120000);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(initialBankAccounts);

  const availableBalance = pendingEarnings;

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);

  const getTransactionById = useCallback(
    (id: string) => {
      return transactions.find((txn) => txn.id === id);
    },
    [transactions]
  );

  const getTransactionsByType = useCallback(
    (type: 'credit' | 'debit') => {
      return transactions.filter((txn) => txn.type === type);
    },
    [transactions]
  );

  const getTransactionsByStatus = useCallback(
    (status: Transaction['status']) => {
      return transactions.filter((txn) => txn.status === status);
    },
    [transactions]
  );

  const addBankAccount = useCallback((account: Omit<BankAccount, 'id'>) => {
    const newAccount: BankAccount = {
      ...account,
      id: Date.now().toString(),
    };
    setBankAccounts((prev) => [...prev, newAccount]);
  }, []);

  const removeBankAccount = useCallback((id: string) => {
    setBankAccounts((prev) => prev.filter((account) => account.id !== id));
  }, []);

  const getBankAccountById = useCallback(
    (id: string) => {
      return bankAccounts.find((account) => account.id === id);
    },
    [bankAccounts]
  );

  const withdrawFunds = useCallback(
    async (amount: number, accountId: string) => {
      if (amount > availableBalance) {
        throw new Error('Insufficient balance');
      }

      if (amount < 100) {
        throw new Error('Minimum withdrawal amount is ₹100');
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update balances
      setPendingEarnings((prev) => prev - amount);
      setWithdrawnEarnings((prev) => prev + amount);

      // Add transaction
      addTransaction({
        type: 'debit',
        amount,
        description: `Withdrawal to ${getBankAccountById(accountId)?.bankName || 'Bank'}`,
        status: 'pending',
        reference: 'WDX' + Date.now().toString().slice(-6),
      });
    },
    [availableBalance, addTransaction, getBankAccountById]
  );

  const addEarnings = useCallback(
    (amount: number, description: string) => {
      setTotalEarnings((prev) => prev + amount);
      setPendingEarnings((prev) => prev + amount);

      addTransaction({
        type: 'credit',
        amount,
        description,
        status: 'completed',
        reference: 'TXN' + Date.now().toString().slice(-6),
      });
    },
    [addTransaction]
  );

  const updatePendingEarnings = useCallback((amount: number) => {
    setPendingEarnings((prev) => prev + amount);
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        totalEarnings,
        pendingEarnings,
        withdrawnEarnings,
        availableBalance,
        transactions,
        addTransaction,
        getTransactionById,
        getTransactionsByType,
        getTransactionsByStatus,
        bankAccounts,
        addBankAccount,
        removeBankAccount,
        getBankAccountById,
        withdrawFunds,
        addEarnings,
        updatePendingEarnings,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}


