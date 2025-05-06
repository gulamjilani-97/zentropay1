import { useExpense } from '../../context/ExpenseContext';

const BudgetProgress = () => {
  const { expenses, budgets } = useExpense();
  
  // Calculate total spent per category
  const categorySpending = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {} as Record<string, number>);
  
  // Create budget progress data
  const budgetProgressData = budgets.map(budget => {
    const spent = categorySpending[budget.category] || 0;
    const percentage = (spent / budget.amount) * 100;
    return {
      ...budget,
      spent,
      percentage,
      remaining: budget.amount - spent
    };
  });
  
  // Sort by percentage (highest first)
  budgetProgressData.sort((a, b) => b.percentage - a.percentage);
  
  return (
    <div className="card bg-white">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Budget Progress</h3>
      </div>
      
      <div className="p-6">
        {budgetProgressData.length > 0 ? (
          <div className="space-y-5">
            {budgetProgressData.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.percentage > 90 ? 'bg-red-100 text-red-800' :
                      item.percentage > 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.percentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">${item.spent.toFixed(2)}</span>
                    <span> / </span>
                    <span>${item.amount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      item.percentage > 90 ? 'bg-error' :
                      item.percentage > 75 ? 'bg-warning' :
                      'bg-primary'
                    }`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">
                  ${item.remaining.toFixed(2)} remaining
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No budget data available
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetProgress;