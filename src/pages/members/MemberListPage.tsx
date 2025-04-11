import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { dummyMembers } from '../../utils/dummyMembers';
import instance from '../../api/axiosInstance';

interface Member {
  id: number;
  name: string;
  phone: string;
  branch: string;
  role: string;
  gender: string;
  birth: string;
}

const MemberListPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // setMembers(dummyMembers);
    (async function memberFetch() {
      setLoading(true);
      try {
        const response = await instance.get('/api/admin/modify-info');
        console.log(response.data.users);
        setMembers(response.data.users);
      } catch(e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);

  const handleRowClick = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null); // 이미 선택된 경우 해제
    } else {
      setSelectedId(id); // 새로 선택된 경우 업데이트
    }
  };

  return (
    <Container>
      <Title>회원 목록</Title>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>지점</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <React.Fragment key={m.id}>
              <tr
                onClick={() => handleRowClick(m.id)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedId === m.id ? '#eef2ff' : 'white',
                }}
              >
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.phone}</td>
                <td>{m.branch}</td>
              </tr>
              {selectedId === m.id && (
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
                        onClick={() => navigate(`/admin/members/${m.id}`)}
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
      </Table>
    </Container>
  );
};

export default MemberListPage;

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
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
`;
