import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import FinancialSummary from '../components/dashboard/FinancialSummary';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import ExpenseForm from '../components/expenses/ExpenseForm';

const Dashboard = () => {
  const { isLoading } = useExpense();
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hours = new Date().getHours();
    
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}!</h1>
          <p className="text-gray-600 mt-1">Welcome to your financial dashboard</p>
        </div>
        
        <button
          onClick={() => setShowExpenseForm(true)}
          className="btn btn-primary mt-3 md:mt-0"
        >
          <Plus size={18} className="mr-1" />
          Add Expense
        </button>
      </div>
      
      <div className="mb-6 slide-in-up" style={{ animationDelay: '0.1s' }}>
        <FinancialSummary />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="slide-in-up" style={{ animationDelay: '0.2s' }}>
          <ExpenseChart />
        </div>
        <div className="slide-in-up" style={{ animationDelay: '0.3s' }}>
          <BudgetProgress />
        </div>
      </div>
      
      <div className="slide-in-up" style={{ animationDelay: '0.4s' }}>
        <RecentTransactions />
      </div>
      
      {showExpenseForm && (
        <ExpenseForm onClose={() => setShowExpenseForm(false)} />
      )}
    </div>
  );
};

export default Dashboard;