import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../../api/axiosInstance';

interface Member {
  identifier: string;
  name: string;
  phone: string;
  branch: string;
  role: string;
  gender: string;
  birth: string;
}

const MemberListPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchMemberList() {
      try {
        const res = await instance.get('/api/admin/modify-info');
        setMembers(res.data.users);
      } catch (error) {
        console.error('회원 목록 불러오기 실패', error);
      }
    })();
  }, []);

  const handleRowClick = useCallback(
    (identifier: string) => {
      if (selectedId === identifier) {
        setSelectedId(null);
        navigate(`/admin/members`);
      } else {
        setSelectedId(identifier);
        navigate(`/admin/members/${identifier}`);
      }
    },
    [selectedId, navigate]
  );

  return (
    <Wrapper>
      <Container>
        <Title>회원 목록</Title>
        <TableHeader>
          <Cell>
            <strong>식별자</strong>
          </Cell>
          <Cell>
            <strong>이름</strong>
          </Cell>
          <Cell>
            <strong>전화번호</strong>
          </Cell>
          <Cell>
            <strong>지점</strong>
          </Cell>
        </TableHeader>
        <TableBody>
          {members.map((m) => (
            <React.Fragment key={m.identifier}>
              <TableRow
                onClick={() => handleRowClick(m.identifier)}
                selected={selectedId === m.identifier}
              >
                <Cell>{m.identifier}</Cell>
                <Cell>{m.name}</Cell>
                <Cell>{m.phone}</Cell>
                <Cell>{m.branch}</Cell>
              </TableRow>
              {m.identifier === selectedId && (
                <DetailWrapper>
                  <Outlet />
                </DetailWrapper>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Container>
    </Wrapper>
  );
};

export default MemberListPage;

//  스타일 컴포넌트

const Wrapper = styled.div`
  width: 100%;
  padding: 0rem 1rem 2rem;
  background-color: #f9fafb;
`;

const Container = styled.div`
  width: 100%;
  max-width: 100%; // ✅ 제한 없이 꽉 차게
  padding: 0 2rem;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-left: 0.5rem;
  color: #1f2937;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.9fr 2fr 2.3fr 1.7fr; //
  padding: 1rem 1.7rem;
  background-color: #f3f4f6;
  border-radius: 6px 6px 0 0;
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
`;

const TableRow = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: 2fr 2fr 2.5fr 2fr;
  padding: 1rem 1rem;
  background-color: ${({ selected }) => (selected ? '#eef2ff' : 'white')};
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem; //
  font-size: 1rem;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailWrapper = styled.div`
  background-color: #ffffff;
  padding: 1.25rem 2rem 2.5rem;
  border-top: 1px solid #e5e7eb;
`;
