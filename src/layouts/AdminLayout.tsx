import React from 'react';
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LogOut, LayoutDashboard, Users, ClipboardList, FileText, Bell, ShieldCheck, CalendarX2, Ban, Settings, MessageSquare } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/') {
    return <Navigate to="/login" replace />;
  }

  const isAdminRoute = location.pathname.startsWith('/admin');
  if (!isAdminRoute) return <Outlet />;

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Wrapper>
      <Sidebar>
        <SidebarContent>
          <Logo>연두테니스</Logo>
          <SidebarDivider />
          <SectionLabel>메인</SectionLabel>
          <NavList>
            <NavItem to="/admin/dashboard"><LayoutDashboard size={18} /> 대시보드</NavItem>
            <NavItem to="/admin/members"><Users size={18} /> 회원 목록</NavItem>
          </NavList>

          <SidebarDivider />
          <SectionLabel>관리 기능</SectionLabel>
          <NavList>
            <NavItem to="/admin/requests"><ClipboardList size={18} /> 가입 요청</NavItem>
            <NavItem to="/admin/withdrawals"><FileText size={18} /> 탈퇴 신청</NavItem>
            <NavItem to="/admin/roles"><ShieldCheck size={18} /> 권한 부여</NavItem>
            <NavItem to="/admin/notices"><Bell size={18} /> 공지 등록</NavItem>
            <NavItem to="/admin/reservations"><CalendarX2 size={18} /> 예약 로그</NavItem>
            <NavItem to="/admin/courts"><Ban size={18} /> 코트 제어</NavItem>
          </NavList>

          <SidebarDivider />
          <SectionLabel>기타</SectionLabel>
          <NavList>
            <NavItem to="#"><Settings size={18} /> 설정</NavItem>
            <NavItem to="#"><MessageSquare size={18} /> 피드백</NavItem>
          </NavList>
        </SidebarContent>

        <LogoutArea>
          <LogoutButton onClick={handleLogout}>
            <LogOut size={16} style={{ marginRight: '0.5rem' }} /> 로그아웃
          </LogoutButton>
        </LogoutArea>
      </Sidebar>

      <MainWrapper>
        <Header>
          <UserInfo>
            👋 반갑습니다, <strong>관리자님</strong> 오늘도 좋은 하루 되세요!
          </UserInfo>
        </Header>
        <MainContent>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </Wrapper>
  );
};

export default AdminLayout;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9fafb;
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
`;

const Sidebar = styled.div`
  width: 220px;
  background-color: #1e293b;
  color: white;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  border-right: 1px solid #334155;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  padding: 0.5rem 0.75rem;
  color: white;
  text-align: left;
`;

const SidebarDivider = styled.div`
    height: 1px;
    background-color: #94a3b8; // 잘 보이는 회색
    margin: 0.75rem 0 0.25rem; // 위·아래 여백 적당
    opacity: 1;
`;

const SectionLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #94a3b8;
  padding: 0 0.75rem;
  text-transform: uppercase;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const NavItem = styled(Link)`
  color: #e2e8f0;
  text-decoration: none;
  font-size: 1.05rem;
  padding: 0.55rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: background 0.2s ease;

  &:hover {
    background-color: #334155;
  }
`;

const LogoutArea = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.75rem;
  display: flex;
  justify-content: center;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  color: #e2e8f0;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background-color: #334155;
  }
`;

const MainWrapper = styled.div`
  margin-left: 220px;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.header`
  height: 64px;
  min-height: 64px;
  background-color: #ffffff;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  z-index: 5;
`;

const UserInfo = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #f9fafb;
`;
