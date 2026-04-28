import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import Login from './pages/admin/Login';
import ParentDashboard from './pages/parent/ParentDashboard';
import MedicationForm from './pages/parent/MedicationForm';
import DailyReport from './pages/parent/DailyReport';
import InfoView from './pages/parent/InfoView';
import useAuthStore from './store/useAuthStore';
import PullToRefresh from './components/PullToRefresh';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <PullToRefresh>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          
          {/* Admin Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Teacher Route */}
          <Route 
            path="/teacher" 
            element={
              <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Parent Routes */}
          <Route 
            path="/parent" 
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ParentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/medication" 
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <MedicationForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/reports" 
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DailyReport />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/shuttle" 
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <InfoView type="shuttle" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/menu" 
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <InfoView type="menu" />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PullToRefresh>
    </div>
  );
}

export default App;
