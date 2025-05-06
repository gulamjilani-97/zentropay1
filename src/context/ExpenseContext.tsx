import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  userId: string;
}

export interface Income {
  id: string;
  amount: number;
  source: string;
  description: string;
  date: string;
  userId: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'yearly';
  userId: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  incomes: Income[];
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addIncome: (income: Omit<Income, 'id'>) => void;
  updateIncome: (id: string, income: Partial<Income>) => void;
  deleteIncome: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  isLoading: boolean;
}

// Initial data for demo
const initialExpenses: Expense[] = [
  {
    id: '1',
    amount: 45.99,
    category: 'Food',
    description: 'Grocery shopping',
    date: '2025-03-15',
    userId: '1',
  },
  {
    id: '2',
    amount: 89.50,
    category: 'Transportation',
    description: 'Gas',
    date: '2025-03-12',
    userId: '1',
  },
  {
    id: '3',
    amount: 129.99,
    category: 'Utilities',
    description: 'Electricity bill',
    date: '2025-03-05',
    userId: '1',
  },
  {
    id: '4',
    amount: 9.99,
    category: 'Entertainment',
    description: 'Streaming subscription',
    date: '2025-03-01',
    userId: '1',
  },
];

const initialIncomes: Income[] = [
  {
    id: '1',
    amount: 2500,
    source: 'Salary',
    description: 'Monthly salary',
    date: '2025-03-01',
    userId: '1',
  },
  {
    id: '2',
    amount: 350,
    source: 'Freelance',
    description: 'Website project',
    date: '2025-03-10',
    userId: '1',
  },
];

const initialBudgets: Budget[] = [
  {
    id: '1',
    category: 'Food',
    amount: 400,
    period: 'monthly',
    userId: '1',
  },
  {
    id: '2',
    category: 'Transportation',
    amount: 200,
    period: 'monthly',
    userId: '1',
  },
  {
    id: '3',
    category: 'Entertainment',
    amount: 100,
    period: 'monthly',
    userId: '1',
  },
];

// Create context
const ExpenseContext = createContext<ExpenseContextType | null>(null);

// Provider component
export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from API
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setExpenses(initialExpenses);
      setIncomes(initialIncomes);
      setBudgets(initialBudgets);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Expense methods
  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: uuidv4() };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (id: string, updatedExpense: Partial<Expense>) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    ));
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Income methods
  const addIncome = (income: Omit<Income, 'id'>) => {
    const newIncome = { ...income, id: uuidv4() };
    setIncomes([...incomes, newIncome]);
  };

  const updateIncome = (id: string, updatedIncome: Partial<Income>) => {
    setIncomes(incomes.map(income => 
      income.id === id ? { ...income, ...updatedIncome } : income
    ));
  };

  const deleteIncome = (id: string) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  // Budget methods
  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget = { ...budget, id: uuidv4() };
    setBudgets([...budgets, newBudget]);
  };

  const updateBudget = (id: string, updatedBudget: Partial<Budget>) => {
    setBudgets(budgets.map(budget => 
      budget.id === id ? { ...budget, ...updatedBudget } : budget
    ));
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  const value = {
    expenses,
    incomes,
    budgets,
    addExpense,
    updateExpense,
    deleteExpense,
    addIncome,
    updateIncome,
    deleteIncome,
    addBudget,
    updateBudget,
    deleteBudget,
    isLoading,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

// Custom hook to use the expense context
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};