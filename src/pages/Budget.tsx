import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import BudgetForm from '../components/budget/BudgetForm';

const Budget = () => {
  const { budgets, expenses, deleteBudget } = useExpense();
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  
  // Calculate total budget
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  
  // Calculate category spending
  const categorySpending = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {} as Record<string, number>);
  
  const handleEditClick = (budget: any) => {
    setSelectedBudget(budget);
    setShowBudgetForm(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(id);
    }
  };
  
  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget</h1>
          <p className="text-gray-600 mt-1">Manage your monthly spending limits</p>
        </div>
        
        <button
          onClick={() => {
            setSelectedBudget(null);
            setShowBudgetForm(true);
          }}
          className="btn btn-primary mt-3 md:mt-0"
        >
          <Plus size={18} className="mr-1" />
          Add Budget
        </button>
      </div>
      
      <div className="card p-6 bg-white mb-6">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mr-4">
            <DollarSign size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Total Budget</h3>
            <p className="text-2xl font-bold text-gray-900">${totalBudget.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {budgets.map((budget) => {
          const spent = categorySpending[budget.category] || 0;
          const percentage = (spent / budget.amount) * 100;
          const remaining = budget.amount - spent;
          
          return (
            <div key={budget.id} className="card bg-white p-6">
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{budget.category}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(budget)}
                    className="text-secondary hover:text-secondary-dark"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(budget.id)}
                    className="text-error hover:text-error"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-1 mt-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">Budget: </span>
                  <span className="text-sm font-bold ml-1">${budget.amount.toFixed(2)}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">${spent.toFixed(2)}</span>
                  <span className="text-gray-500"> spent</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div
                  className={`h-2.5 rounded-full ${
                    percentage > 90 ? 'bg-error' :
                    percentage > 75 ? 'bg-warning' :
                    'bg-primary'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <div>
                  <span className={`font-medium ${
                    percentage > 90 ? 'text-error' :
                    percentage > 75 ? 'text-warning' :
                    'text-primary'
                  }`}>
                    {percentage.toFixed(0)}%
                  </span> used
                </div>
                <div>${remaining.toFixed(2)} remaining</div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                {budget.period === 'monthly' ? 'Monthly' : 'Yearly'} budget
              </div>
            </div>
          );
        })}
        
        {/* Empty state */}
        {budgets.length === 0 && (
          <div className="md:col-span-2 card bg-white p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Budgets Set</h3>
            <p className="text-gray-500 mb-4">
              Start managing your finances by setting up budgets for different expense categories.
            </p>
            <button
              onClick={() => setShowBudgetForm(true)}
              className="btn btn-primary"
            >
              <Plus size={18} className="mr-1" />
              Create Your First Budget
            </button>
          </div>
        )}
      </div>
      
      {showBudgetForm && (
        <BudgetForm
          onClose={() => {
            setShowBudgetForm(false);
            setSelectedBudget(null);
          }}
          editBudget={selectedBudget}
        />
      )}
    </div>
  );
};

export default Budget;