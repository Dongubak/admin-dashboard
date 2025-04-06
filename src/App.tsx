import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MemberListPage from './pages/members/MemberListPage';
import MemberDetailPage from './pages/members/MemberDetailPage';
import MemberEditPage from './pages/members/MemberEditPage';
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 기본 진입 시 /login으로 이동 */}
          <Route path='/' element={<Navigate to='/login' replace />} />

          {/* 로그인 페이지 */}
          <Route path='/login' element={<Login />} />

          {/* 관리자 전용 레이아웃 */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='members' element={<MemberListPage />} />
            <Route path='members/:id' element={<MemberDetailPage />} />
            <Route path='members/:id/edit' element={<MemberEditPage />} />
            <Route
              path='/admin/members/:id/edit'
              element={<MemberEditPage />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
