import { useExpense } from '../../context/ExpenseContext';
import { Calendar, DollarSign } from 'lucide-react';

const RecentTransactions = () => {
  const { expenses } = useExpense();
  
  // Sort expenses by date (most recent first)
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5); // Get only the 5 most recent

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Function to get category color
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      Food: 'bg-green-100 text-green-800',
      Transportation: 'bg-blue-100 text-blue-800',
      Utilities: 'bg-purple-100 text-purple-800',
      Entertainment: 'bg-yellow-100 text-yellow-800',
      Shopping: 'bg-pink-100 text-pink-800',
      Health: 'bg-red-100 text-red-800',
      Housing: 'bg-indigo-100 text-indigo-800',
      Other: 'bg-gray-100 text-gray-800'
    };
    
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card bg-white overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button className="text-primary text-sm font-medium hover:text-primary-dark transition-colors">
          View All
        </button>
      </div>
      
      <div className="divide-y divide-gray-200">
        {sortedExpenses.length > 0 ? (
          sortedExpenses.map((expense) => (
            <div key={expense.id} className="p-6 flex items-center hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-4">
                <DollarSign size={20} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{expense.description}</p>
                <div className="flex items-center mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </span>
                  <div className="flex items-center ml-2 text-xs text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(expense.date)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-error">-${expense.amount.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">No recent transactions</div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;