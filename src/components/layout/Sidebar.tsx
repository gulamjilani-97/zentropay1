import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  ArrowUpCircle, 
  PieChart, 
  FileText, 
  Settings, 
  LogOut, 
  Wallet
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <Receipt size={20} /> },
    { name: 'Income', path: '/income', icon: <ArrowUpCircle size={20} /> },
    { name: 'Budget', path: '/budget', icon: <Wallet size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
    // Removed Analytics nav item to prevent redirect to /analytics
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-full w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <Link to="/" className="flex items-center">
          <Wallet className="h-8 w-8 text-green-400" />
          <span className="ml-2 text-xl font-bold text-gray-100">Zentropay</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-2 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
              isActive(item.path)
                ? 'bg-green-700 text-green-300'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
            }`}
          >
            <span className={`mr-3 ${isActive(item.path) ? 'text-green-400' : 'text-gray-500'}`}>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-400 rounded-md hover:bg-gray-800 hover:text-gray-100 transition-colors duration-200"
        >
          <LogOut size={20} className="mr-3 text-gray-500" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;