// 이 파일은 회원 관리 전용 테이블입니다.

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { generateDummyData } from '../utils/dummyMembers';

// Member 데이터 타입 정의
interface Member {
  id: number;
  name: string;
  gender: string;
  birth: string;
  phone: string;
  branch: string;
  memberNo: string;
  role: string;
  career: string;
  ntrp: string;
  refundAccount: string;
  refundBank: string;
  receiptInfo: string;
  receiptType: string;
  receiptNumber: string;
  trainerId: string;
  banned: boolean;
  createdAt: string;
  updatedAt: string;
}

const MemberListPage: React.FC = () => {
  // ✅ 컨테이너 역할: 상태 관리 및 데이터 처리
  const [members, setMembers] = useState<Member[]>([]); // 전체 회원 리스트
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [search, setSearch] = useState(''); // 검색어
  const pageSize = 10; // 한 페이지당 회원 수

  // 통계 데이터 계산
  const totalCount = members.length;
  const bannedCount = members.filter((m) => m.banned).length;
  const trainerCount = members.filter((m) => m.role === 'trainer').length;
  const branchStats = members.reduce((acc, m) => {
    acc[m.branch] = (acc[m.branch] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 더미 데이터 불러오기 (초기 렌더링 시 1회 실행)
  useEffect(() => {
    const dummyData = generateDummyData(30);
    setMembers(dummyData);
  }, []);

  // 검색어 필터링 적용
  const filtered = members.filter((m) =>
    m.name.includes(search) || m.phone.includes(search)
  );

  // 페이지네이션 처리
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // ✅ 컴포넌트 역할: 화면 렌더링
  return (
    <PageContainer>
      <ContentBox>
        {/* 상단 제목 및 검색 입력 */}
        <Header>
          <Title>회원 목록</Title>
          <SearchInput
            type="text"
            placeholder="이름 또는 전화번호 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Header>

        {/* 관리자 요약 통계 카드 영역 */}
        <StatsContainer>
          <StatCard>총 회원: {totalCount}명</StatCard>
          <StatCard>정지된 회원: {bannedCount}명</StatCard>
          <StatCard>트레이너: {trainerCount}명</StatCard>
          <StatCard>
            지점별:
            {Object.entries(branchStats).map(([branch, count]) => (
              <span key={branch}> {branch}({count}) </span>
            ))}
          </StatCard>
        </StatsContainer>

        {/* 회원 목록 테이블 */}
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>전화번호</th>
                <th>지점</th>
                <th>성별</th>
                <th>회원번호</th>
                <th>권한</th>
                <th>NTRP</th>
                <th>정지</th>
                <th>가입일</th>
                <th>수정일</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.phone}</td>
                  <td>{m.branch}</td>
                  <td>{m.gender}</td>
                  <td>{m.memberNo}</td>
                  <td>{m.role}</td>
                  <td>{m.ntrp}</td>
                  <td>{m.banned ? '정지됨' : '정상'}</td>
                  <td>{m.createdAt}</td>
                  <td>{m.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>

        {/* 페이지 이동 버튼 */}
        <Pagination>
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            이전
          </button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            다음
          </button>
        </Pagination>
      </ContentBox>
    </PageContainer>
  );
};

export default MemberListPage;

// ✅ 스타일 컴포넌트 정의

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f4f7;
  padding: 0rem;
`;

const ContentBox = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1250px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 300px;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1f2937;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    white-space: nowrap;
    border-bottom: 1px solid #f0f0f0;
  }

  thead {
    background-color: #f9fafb;
  }

  tbody tr:hover {
    background-color: #f5f7ff;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    font-weight: bold;
  }
`;
