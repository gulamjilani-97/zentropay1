import { useExpense } from '../../context/ExpenseContext';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartData {
  name: string;
  amount: number;
}

const ExpenseChart = () => {
  const { expenses } = useExpense();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Colors for the chart bars
  const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#6366F1', '#EC4899'];

  useEffect(() => {
    // Group expenses by category and calculate total amount
    const categoryMap = expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {} as Record<string, number>);

    // Convert to chart data format
    const data = Object.entries(categoryMap).map(([name, amount]) => ({
      name,
      amount,
    }));

    // Sort by amount (descending)
    data.sort((a, b) => b.amount - a.amount);

    setChartData(data);
  }, [expenses]);

  if (chartData.length === 0) {
    return (
      <div className="card p-6 bg-white h-80 flex items-center justify-center">
        <p className="text-gray-500">No expense data available</p>
      </div>
    );
  }

  return (
    <div className="card p-6 bg-white">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={60} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']}
              labelStyle={{ fontWeight: 'bold' }}
              contentStyle={{ borderRadius: '0.375rem' }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;