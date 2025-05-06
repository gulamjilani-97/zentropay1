import { useState } from 'react';
import { User, Lock, CreditCard, Bell, LogOut } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const [profileData, setProfileData] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    phone: '(555) 123-4567',
    currency: 'USD',
    language: 'en',
    timezone: 'America/New_York',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    expenseAlerts: true,
    budgetAlerts: true,
    weeklyReports: false,
    monthlyReports: true,
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings({ ...notificationSettings, [name]: checked });
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                <select
                  name="currency"
                  value={profileData.currency}
                  onChange={handleProfileChange}
                  className="input"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  name="language"
                  value={profileData.language}
                  onChange={handleProfileChange}
                  className="input"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  name="timezone"
                  value={profileData.timezone}
                  onChange={handleProfileChange}
                  className="input"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex justify-end">
              <button className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input type="password" className="input" placeholder="Enter your current password" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" className="input" placeholder="Enter new password" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input type="password" className="input" placeholder="Confirm new password" />
                </div>
              </div>
              
              <div className="mt-4">
                <button className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
              <p className="text-gray-500 mb-4">Add an extra layer of security to your account by enabling two-factor authentication.</p>
              
              <button className="btn btn-outline">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        );
        
      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Methods</h3>
              <p className="text-gray-500 mb-4">Connect your payment methods to easily track expenses directly from your accounts.</p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <CreditCard size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <div>
                    <button className="text-sm text-gray-500 hover:text-gray-700">Edit</button>
                  </div>
                </div>
                
                <button className="btn btn-outline flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Payment Method
                </button>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Connected Accounts</h3>
              <p className="text-gray-500 mb-4">Connect your bank accounts to automatically import transactions.</p>
              
              <button className="btn btn-primary">
                Connect Bank Account
              </button>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Notification Preferences</h3>
            <p className="text-gray-500 mb-4">Manage how and when you receive notifications from Zentropay.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Expense Alerts</p>
                  <p className="text-sm text-gray-500">Get notified about large or unusual expenses</p>
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="expenseAlerts"
                      checked={notificationSettings.expenseAlerts}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Budget Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when you approach or exceed budget limits</p>
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="budgetAlerts"
                      checked={notificationSettings.budgetAlerts}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Weekly Reports</p>
                  <p className="text-sm text-gray-500">Receive weekly summary of your financial activity</p>
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="weeklyReports"
                      checked={notificationSettings.weeklyReports}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Monthly Reports</p>
                  <p className="text-sm text-gray-500">Receive monthly summary of your financial activity</p>
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="monthlyReports"
                      checked={notificationSettings.monthlyReports}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button className="btn btn-primary">
                Save Preferences
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'profile'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={16} className="inline mr-1" />
            Profile
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'security'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={16} className="inline mr-1" />
            Security
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'payment'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('payment')}
          >
            <CreditCard size={16} className="inline mr-1" />
            Payment Methods
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'notifications'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={16} className="inline mr-1" />
            Notifications
          </button>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Account Actions</h3>
            <p className="text-gray-500 mt-1">Manage your account status</p>
          </div>
          <button className="btn flex items-center text-error border border-error bg-white hover:bg-error hover:text-white transition-colors">
            <LogOut size={16} className="mr-1" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;