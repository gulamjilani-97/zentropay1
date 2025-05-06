import { useAuth } from '../../context/AuthContext';
import { Bell, Search, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuButtonClick: () => void;
}

const Navbar = ({ onMenuButtonClick }: NavbarProps) => {
  const { currentUser, logout } = useAuth();

  return (
  <header className="bg-gray-900 border-b border-gray-800 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger menu (mobile) */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-300 focus:outline-none"
              onClick={onMenuButtonClick}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Left: Logo (desktop) */}
          <div className="hidden md:flex md:items-center">
            <span className="text-xl font-bold text-gray-100">Zentropay</span>
          </div>

          {/* Center: Search bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-auto">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-md text-sm placeholder-gray-400 border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Search transactions..."
              />
            </div>
          </div>

          {/* Right: User menu & notifications */}
          <div className="flex items-center space-x-4">
            <button className="p-1 text-gray-400 hover:text-gray-300">
              <span className="sr-only">View notifications</span>
              <Bell size={20} />
            </button>

            <div className="flex items-center">
              <div className="ml-3 relative flex items-center">
                <div className="flex items-center">
                  <span className="hidden md:block mr-2 text-sm font-medium text-gray-200">
                    {currentUser?.name}
                  </span>
                  <button 
                    className="bg-gray-700 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={logout}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-green-300 flex items-center justify-center text-green-900 font-medium">
                      {currentUser?.name.charAt(0).toUpperCase()}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;