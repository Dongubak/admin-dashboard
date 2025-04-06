import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { dummyMembers } from '../../utils/dummyMembers';

interface Member {
  id: number;
  name: string;
  phone: string;
  branch: string;
  role: string;
  gender: string;
  birth: string;
}

const MemberDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const found = dummyMembers.find((m) => m.id === Number(id));
    setMember(found || null);
  }, [id]);

  if (!member) return <p>회원을 찾을 수 없습니다.</p>;

  return (
    <Container>
      <Header>
        <h2>{member.name} 님 상세 정보</h2>
        <EditButton
          onClick={() => navigate(`/admin/members/${member.id}/edit`)}
        >
          수정하기
        </EditButton>
      </Header>

      <DetailBox>
        <DetailItem>
          <strong>이름:</strong> {member.name}
        </DetailItem>
        <DetailItem>
          <strong>전화번호:</strong> {member.phone}
        </DetailItem>
        <DetailItem>
          <strong>지점:</strong> {member.branch}
        </DetailItem>
        <DetailItem>
          <strong>역할:</strong> {member.role}
        </DetailItem>
        <DetailItem>
          <strong>성별:</strong> {member.gender}
        </DetailItem>
        <DetailItem>
          <strong>생년월일:</strong> {member.birth}
        </DetailItem>
      </DetailBox>
    </Container>
  );
};

export default MemberDetailPage;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
  }
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailItem = styled.div`
  font-size: 1rem;
  color: #374151;
`;
