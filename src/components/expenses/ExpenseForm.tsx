import { useState, FormEvent } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { useAuth } from '../../context/AuthContext';
import { X } from 'lucide-react';

interface ExpenseFormProps {
  onClose: () => void;
  editExpense?: {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
  };
}

const ExpenseForm = ({ onClose, editExpense }: ExpenseFormProps) => {
  const { addExpense, updateExpense } = useExpense();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    amount: editExpense?.amount.toString() || '',
    category: editExpense?.category || '',
    description: editExpense?.description || '',
    date: editExpense?.date || new Date().toISOString().split('T')[0],
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
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const expenseData = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      userId: currentUser?.id || '',
    };
    
    if (editExpense) {
      updateExpense(editExpense.id, expenseData);
    } else {
      addExpense(expenseData);
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
            {editExpense ? 'Edit Expense' : 'Add New Expense'}
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
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className={`input ${errors.description ? 'border-error' : ''}`}
                placeholder="What was this expense for?"
              />
              {errors.description && <p className="mt-1 text-sm text-error">{errors.description}</p>}
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className={`input ${errors.date ? 'border-error' : ''}`}
              />
              {errors.date && <p className="mt-1 text-sm text-error">{errors.date}</p>}
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
              {editExpense ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;