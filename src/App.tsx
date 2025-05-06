import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/layout/Layout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
              <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
              <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Route>
          </Routes>
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;