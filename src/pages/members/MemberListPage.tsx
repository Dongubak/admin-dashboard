import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../../api/axiosInstance';

// ✅ API에서 내려오는 회원 타입 정의
interface Member {
  identifier: string; // ← id 대신
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

  // ✅ 데이터 로딩
  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get('/api/admin/modify-info');
        setMembers(res.data.users); // 서버에서 받은 회원 목록 세팅
      } catch (error) {
        console.error('회원 목록 불러오기 실패', error);
      }
    })();
  }, []);

  // ✅ 클릭 시 열기/닫기 토글
  const handleRowClick = (identifier: string) => {
    setSelectedId((prev) => (prev === identifier ? null : identifier));
  };

  return (
    <Container>
      <Title>회원 목록</Title>
      <StyledTable>
        <thead>
          <tr>
            <th>식별자</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>지점</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <React.Fragment key={m.identifier}>
              <tr
                onClick={() => handleRowClick(m.identifier)}
                style={{
                  cursor: 'pointer',
                  backgroundColor:
                    selectedId === m.identifier ? '#eef2ff' : 'white',
                }}
              >
                <td>{m.identifier}</td>
                <td>{m.name}</td>
                <td>{m.phone}</td>
                <td>{m.branch}</td>
              </tr>

              {/* 🔽 선택된 회원만 상세 정보 노출 */}
              {selectedId === m.identifier && (
                <tr>
                  <td colSpan={4}>
                    <DetailBox>
                      <DetailItem>
                        <strong>역할:</strong> {m.role}
                      </DetailItem>
                      <DetailItem>
                        <strong>성별:</strong> {m.gender}
                      </DetailItem>
                      <DetailItem>
                        <strong>생년월일:</strong> {m.birth}
                      </DetailItem>
                      <EditButton
                        onClick={() =>
                          navigate(`/admin/members/${m.identifier}`)
                        }
                      >
                        상세 보기
                      </EditButton>
                    </DetailBox>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default MemberListPage;

// ✅ 스타일

const Container = styled.div`
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 1rem 0; /* ⬅︎ 아래쪽만 여백 */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  thead {
    background-color: #f3f4f6;
  }
`;

const DetailBox = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailItem = styled.div`
  font-size: 0.9rem;
  color: #374151;
`;

const EditButton = styled.button`
  margin-top: 1rem;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
  }
`;
