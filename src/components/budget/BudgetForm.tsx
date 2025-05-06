import { useState, FormEvent } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { useAuth } from '../../context/AuthContext';
import { X } from 'lucide-react';

interface BudgetFormProps {
  onClose: () => void;
  editBudget?: {
    id: string;
    category: string;
    amount: number;
    period: 'monthly' | 'yearly';
  };
}

const BudgetForm = ({ onClose, editBudget }: BudgetFormProps) => {
  const { addBudget, updateBudget } = useExpense();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    category: editBudget?.category || '',
    amount: editBudget?.amount.toString() || '',
    period: editBudget?.period || 'monthly',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const budgetData = {
      category: formData.category,
      amount: parseFloat(formData.amount),
      period: formData.period as 'monthly' | 'yearly',
      userId: currentUser?.id || '',
    };
    
    if (editBudget) {
      updateBudget(editBudget.id, budgetData);
    } else {
      addBudget(budgetData);
    }
    
    onClose();
  };

  const categories = [
    'Food', 'Transportation', 'Entertainment', 'Utilities', 
    'Housing', 'Shopping', 'Health', 'Education', 'Travel', 'Other'
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {editBudget ? 'Edit Budget' : 'Add New Budget'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className={`input ${errors.category ? 'border-error' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-error">{errors.category}</p>}
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Budget Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`input pl-7 ${errors.amount ? 'border-error' : ''}`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && <p className="mt-1 text-sm text-error">{errors.amount}</p>}
            </div>
            
            <div>
              <label htmlFor="period" className="block text-sm font-medium text-gray-700">
                Budget Period
              </label>
              <select
                name="period"
                id="period"
                value={formData.period}
                onChange={handleChange}
                className="input"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {editBudget ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;