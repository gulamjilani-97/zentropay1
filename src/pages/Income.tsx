import { useState } from 'react';
import { Plus, Edit, Trash2, ArrowUpCircle } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import IncomeForm from '../components/income/IncomeForm';

const Income = () => {
  const { incomes, deleteIncome } = useExpense();
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<any>(null);
  
  const handleEditClick = (income: any) => {
    setSelectedIncome(income);
    setShowIncomeForm(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      deleteIncome(id);
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
  
  // Calculate total income
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  
  // Get source colors
  const getSourceColor = (source: string) => {
    const sourceColors: Record<string, string> = {
      Salary: 'bg-green-100 text-green-800',
      Freelance: 'bg-blue-100 text-blue-800',
      Business: 'bg-purple-100 text-purple-800',
      Investments: 'bg-yellow-100 text-yellow-800',
      Rental: 'bg-pink-100 text-pink-800',
      Gift: 'bg-indigo-100 text-indigo-800',
      Reimbursement: 'bg-teal-100 text-teal-800',
      Other: 'bg-gray-100 text-gray-800'
    };
    
    return sourceColors[source] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Income</h1>
          <p className="text-gray-600 mt-1">Track and manage your income sources</p>
        </div>
        
        <button
          onClick={() => {
            setSelectedIncome(null);
            setShowIncomeForm(true);
          }}
          className="btn btn-primary mt-3 md:mt-0"
        >
          <Plus size={18} className="mr-1" />
          Add Income
        </button>
      </div>
      
      <div className="card p-6 bg-white mb-6">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-secondary-light flex items-center justify-center mr-4">
            <ArrowUpCircle size={24} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Total Income</h3>
            <p className="text-2xl font-bold text-gray-900">${totalIncome.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="card bg-white overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Income Sources</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {incomes.length > 0 ? (
                incomes.map((income) => (
                  <tr key={income.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{income.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSourceColor(income.source)}`}>
                        {income.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(income.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-success">+${income.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(income)}
                        className="text-secondary hover:text-secondary-dark mr-3"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(income.id)}
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
                    No income entries found. Add your first income!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {showIncomeForm && (
        <IncomeForm
          onClose={() => {
            setShowIncomeForm(false);
            setSelectedIncome(null);
          }}
          editIncome={selectedIncome}
        />
      )}
    </div>
  );
};

export default Income;