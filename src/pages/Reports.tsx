import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { Download, ChevronDown, Calendar, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Reports = () => {
  const { expenses, incomes } = useExpense();
  const [reportType, setReportType] = useState('expenses'); // 'expenses' or 'income'
  const [chartType, setChartType] = useState('pie'); // 'pie' or 'bar'
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year', 'all'
  
  // Colors for charts
  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#6366F1', '#EC4899', '#14B8A6', '#F97316', '#6B7280'];
  
  // Filter data by time range
  const filterByTimeRange = (data: any[]) => {
    const now = new Date();
    const filtered = data.filter(item => {
      const itemDate = new Date(item.date);
      
      if (timeRange === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate >= weekAgo;
      } else if (timeRange === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return itemDate >= monthAgo;
      } else if (timeRange === 'year') {
        const yearAgo = new Date();
        yearAgo.setFullYear(now.getFullYear() - 1);
        return itemDate >= yearAgo;
      }
      
      return true; // 'all' time range
    });
    
    return filtered;
  };
  
  // Prepare chart data
  const prepareChartData = () => {
    if (reportType === 'expenses') {
      const filteredExpenses = filterByTimeRange(expenses);
      
      // Group by category
      const categoryMap = filteredExpenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
      }, {} as Record<string, number>);
      
      // Convert to chart data format
      return Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value,
      }));
    } else {
      // Income report
      const filteredIncomes = filterByTimeRange(incomes);
      
      // Group by source
      const sourceMap = filteredIncomes.reduce((acc, income) => {
        const { source, amount } = income;
        if (!acc[source]) {
          acc[source] = 0;
        }
        acc[source] += amount;
        return acc;
      }, {} as Record<string, number>);
      
      // Convert to chart data format
      return Object.entries(sourceMap).map(([name, value]) => ({
        name,
        value,
      }));
    }
  };
  
  const chartData = prepareChartData();
  
  // Calculate totals
  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Analyze your financial data</p>
        </div>
        
        <button className="btn btn-outline mt-3 sm:mt-0 flex items-center">
          <Download size={16} className="mr-1" />
          Export Report
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Report Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <div className="relative">
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="input appearance-none pr-8"
                >
                  <option value="expenses">Expenses</option>
                  <option value="income">Income</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            
            {/* Chart Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chart Type
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setChartType('pie')}
                  className={`flex-1 btn ${
                    chartType === 'pie' 
                      ? 'bg-primary-light text-primary-dark' 
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  <PieChartIcon size={16} className="mr-1" />
                  Pie
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`flex-1 btn ${
                    chartType === 'bar' 
                      ? 'bg-primary-light text-primary-dark' 
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  <BarChartIcon size={16} className="mr-1" />
                  Bar
                </button>
              </div>
            </div>
            
            {/* Time Range Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Range
              </label>
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="input appearance-none pr-8"
                >
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="year">Last Year</option>
                  <option value="all">All Time</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Calendar size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {reportType === 'expenses' ? 'Expense Analysis' : 'Income Analysis'}
            </h3>
            <div className="font-bold text-xl text-gray-900">
              ${totalAmount.toFixed(2)}
            </div>
          </div>
          
          {chartData.length > 0 ? (
            <div className="h-80">
              {chartType === 'pie' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 70 }}
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
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500">No data available for the selected criteria</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {reportType === 'expenses' ? 'Expense Transactions' : 'Income Transactions'}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {reportType === 'expenses' ? 'Category' : 'Source'}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportType === 'expenses' ? (
                filterByTimeRange(expenses).map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-error">
                      -${expense.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                filterByTimeRange(incomes).map((income) => (
                  <tr key={income.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(income.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {income.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {income.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-success">
                      +${income.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
              
              {/* Empty state */}
              {((reportType === 'expenses' && filterByTimeRange(expenses).length === 0) ||
                (reportType === 'income' && filterByTimeRange(incomes).length === 0)) && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No transactions found for the selected time period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;