import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  career: string;
  ntrp: string;
  refundAccount: string;
  refundBank: string;
  receiptInfo: string;
  receiptType: string;
  receiptNumber: string;
  trainerId: string | null;
  banned: boolean;
  createdAt: string;
  updatedAt: string;
  memberNo: string | null;
}

const MemberDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get('/api/admin/modify-info');
        const found = res.data.users.find((m: Member) => m.identifier === id);
        setMember(found || null);
      } catch (e) {
        console.error('회원 조회 실패:', e);
      }
    })();
  }, [id]);

  if (!member) return <Container>해당 회원을 찾을 수 없습니다.</Container>;

  return (
    <Container>
      <Header>
        <h2>{member.name} 님 상세 정보</h2>
        <EditButton
          onClick={() => navigate(`/admin/members/${member.identifier}/edit`)}
        >
          수정하기
        </EditButton>
      </Header>

      <GroupTitle>기본 정보</GroupTitle>
      <DetailGrid>
        <DetailItem>
          <strong>이름:</strong> {member.name}
        </DetailItem>
        <DetailItem>
          <strong>회원번호:</strong> {member.memberNo || member.identifier}
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
        <DetailItem>
          <strong>경력:</strong> {member.career}
        </DetailItem>
        <DetailItem>
          <strong>NTRP:</strong> {member.ntrp}
        </DetailItem>
      </DetailGrid>

      <GroupTitle>추가 정보</GroupTitle>
      <DetailGrid>
        <DetailItem>
          <strong>계좌번호:</strong> {member.refundAccount}
          <SubText>({member.refundBank})</SubText>
        </DetailItem>
        <DetailItem>
          <strong>영수증:</strong> {member.receiptType} - {member.receiptInfo}
          <SubText>({member.receiptNumber})</SubText>
        </DetailItem>
        <DetailItem>
          <strong>트레이너 ID:</strong> {member.trainerId || '없음'}
        </DetailItem>
        <DetailItem>
          <strong>정지 상태:</strong> {member.banned ? '정지됨' : '정상'}
        </DetailItem>
      </DetailGrid>

      <GroupTitle>기록</GroupTitle>
      <DetailGrid>
        <DetailItem>
          <strong>가입일:</strong> {member.createdAt}
        </DetailItem>
        <DetailItem>
          <strong>최근 수정일:</strong> {member.updatedAt}
        </DetailItem>
      </DetailGrid>
    </Container>
  );
};

export default MemberDetailPage;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9fafb;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    color: #1f2937;
  }
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
  }
`;

const GroupTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #334155;
  margin: 2rem 0 1rem;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const DetailItem = styled.div`
  font-size: 0.96rem;
  color: #374151;

  strong {
    display: inline-block;
    min-width: 100px;
    color: #111827;
  }
`;

const SubText = styled.span`
  color: #6b7280;
  font-size: 0.92rem;
  margin-left: 4px;
`;
