import { useState } from 'react';
import { Plus } from 'lucide-react';
import ExpenseTable from '../components/expenses/ExpenseTable';
import ExpenseForm from '../components/expenses/ExpenseForm';

const Expenses = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600 mt-1">Manage and track your spending</p>
        </div>
        
        <button
          onClick={() => setShowExpenseForm(true)}
          className="btn btn-primary mt-3 md:mt-0"
        >
          <Plus size={18} className="mr-1" />
          Add Expense
        </button>
      </div>
      
      <ExpenseTable />
      
      {showExpenseForm && (
        <ExpenseForm onClose={() => setShowExpenseForm(false)} />
      )}
    </div>
  );
};

export default Expenses;