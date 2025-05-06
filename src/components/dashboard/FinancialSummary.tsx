import { useExpense } from '../../context/ExpenseContext';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet } from 'lucide-react';

const FinancialSummary = () => {
  const { expenses, incomes, budgets, isLoading } = useExpense();
  
  // Calculate total income
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate balance
  const balance = totalIncome - totalExpenses;
  
  // Calculate total budget
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  
  // Calculate budget used percentage
  const budgetUsedPercentage = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Balance Card */}
      <div className="card p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-500 text-sm font-medium">Current Balance</div>
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            <DollarSign size={20} className="text-primary" />
          </div>
        </div>
        <div className="font-bold text-2xl text-gray-900">
          ${balance.toFixed(2)}
        </div>
        <div className={`text-sm mt-2 flex items-center ${balance >= 0 ? 'text-success' : 'text-error'}`}>
          {balance >= 0 ? (
            <>
              <ArrowUpRight size={16} className="mr-1" />
              <span>Positive balance</span>
            </>
          ) : (
            <>
              <ArrowDownRight size={16} className="mr-1" />
              <span>Negative balance</span>
            </>
          )}
        </div>
      </div>

      {/* Income Card */}
      <div className="card p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-500 text-sm font-medium">Total Income</div>
          <div className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center">
            <ArrowUpRight size={20} className="text-secondary" />
          </div>
        </div>
        <div className="font-bold text-2xl text-gray-900">
          ${totalIncome.toFixed(2)}
        </div>
        <div className="text-sm mt-2 text-gray-500">
          From {incomes.length} source{incomes.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Expenses Card */}
      <div className="card p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-500 text-sm font-medium">Total Expenses</div>
          <div className="w-10 h-10 rounded-full bg-error bg-opacity-10 flex items-center justify-center">
            <ArrowDownRight size={20} className="text-error" />
          </div>
        </div>
        <div className="font-bold text-2xl text-gray-900">
          ${totalExpenses.toFixed(2)}
        </div>
        <div className="text-sm mt-2 text-gray-500">
          From {expenses.length} transaction{expenses.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Budget Card */}
      <div className="card p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-500 text-sm font-medium">Monthly Budget</div>
          <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center">
            <Wallet size={20} className="text-accent" />
          </div>
        </div>
        <div className="font-bold text-2xl text-gray-900">
          ${totalBudget.toFixed(2)}
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Used:</span>
            <span className="font-medium">{budgetUsedPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                budgetUsedPercentage > 90 ? 'bg-error' : budgetUsedPercentage > 75 ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;