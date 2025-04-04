import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// 관리자 회원 관리 페이지 import
import MemberListPage from './pages/MemberListPage';
import MemberDetailPage from './pages/MemberDetailPage';
import MemberEditPage from './pages/MemberEditPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 기본 라우트 */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />

          {/* 관리자 회원 관리 페이지 */}
          <Route path="/members" element={<MemberListPage />} />
          <Route path="/members/:id" element={<MemberDetailPage />} />
          <Route path="/members/:id/edit" element={<MemberEditPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
