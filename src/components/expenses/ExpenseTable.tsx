import { useState } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { Edit, Trash2, Filter } from 'lucide-react';
import ExpenseForm from './ExpenseForm';

interface FilterOptions {
  category: string;
  dateRange: string;
  sortBy: string;
}

const ExpenseTable = () => {
  const { expenses, deleteExpense } = useExpense();
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    dateRange: 'all',
    sortBy: 'date-desc',
  });
  
  // Get unique categories
  const categories = [...new Set(expenses.map(expense => expense.category))];
  
  const handleEditClick = (expense: any) => {
    setSelectedExpense(expense);
    setShowEditForm(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const applyFilters = () => {
    let filtered = [...expenses];
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(expense => expense.category === filters.category);
    }
    
    // Apply date range filter
    const today = new Date();
    switch (filters.dateRange) {
      case 'week':
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        filtered = filtered.filter(expense => new Date(expense.date) >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        filtered = filtered.filter(expense => new Date(expense.date) >= monthAgo);
        break;
      case 'year':
        const yearAgo = new Date();
        yearAgo.setFullYear(today.getFullYear() - 1);
        filtered = filtered.filter(expense => new Date(expense.date) >= yearAgo);
        break;
      default:
        break;
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'amount-asc':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case 'amount-desc':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      default:
        break;
    }
    
    return filtered;
  };
  
  const filteredExpenses = applyFilters();
  
  // Function to get category badge color
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      Food: 'bg-green-100 text-green-800',
      Transportation: 'bg-blue-100 text-blue-800',
      Utilities: 'bg-purple-100 text-purple-800',
      Entertainment: 'bg-yellow-100 text-yellow-800',
      Shopping: 'bg-pink-100 text-pink-800',
      Health: 'bg-red-100 text-red-800',
      Housing: 'bg-indigo-100 text-indigo-800',
      Education: 'bg-teal-100 text-teal-800',
      Travel: 'bg-orange-100 text-orange-800',
      Other: 'bg-gray-100 text-gray-800'
    };
    
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-900">Your Expenses</h2>
        
        <div className="flex space-x-2">
          <button 
            className="btn btn-outline flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-1" />
            Filter
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="input"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              className="input"
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            >
              <option value="all">All Time</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              className="input"
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="amount-asc">Amount (Low to High)</option>
            </select>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(expense.category)}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(expense.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-error">${expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(expense)}
                      className="text-secondary hover:text-secondary-dark mr-3"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(expense.id)}
                      className="text-error hover:text-error"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No expenses found. Add your first expense!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {showEditForm && selectedExpense && (
        <ExpenseForm
          onClose={() => {
            setShowEditForm(false);
            setSelectedExpense(null);
          }}
          editExpense={selectedExpense}
        />
      )}
    </>
  );
};

export default ExpenseTable;