import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Coding from './pages/Coding';
import CodingChallenge from './pages/CodingChallenge';
import Aptitude from './pages/Aptitude';
import Communication from './pages/Communication';
import Analytics from './pages/Analytics';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/coding" 
              element={
                <ProtectedRoute>
                  <Coding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/coding/:id" 
              element={
                <ProtectedRoute>
                  <CodingChallenge />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/aptitude" 
              element={
                <ProtectedRoute>
                  <Aptitude />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/communication" 
              element={
                <ProtectedRoute>
                  <Communication />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
