import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface User {
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

const dummyUser: User = {
  id: 1,
  name: '김유빈',
  gender: '여성',
  birth: '1993-05-12',
  phone: '010-1234-5678',
  branch: '강남점',
  memberNo: 'M102938',
  role: 'user',
  career: '3년',
  ntrp: '3.5',
  refundAccount: '123-456-7890',
  refundBank: '국민은행',
  receiptInfo: '사업자',
  receiptType: '세금계산서',
  receiptNumber: '101-88-12345',
  trainerId: 'T1002',
  banned: false,
  createdAt: '2024-02-01',
  updatedAt: '2025-03-29',
};

const MemberDetailPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === '1') {
      setUser(dummyUser);
    }
  }, [id]);

  if (!user) return <Container>불러오는 중...</Container>;

  return (
    <Container>
      <Form>
        <Title>회원 정보</Title>

        <Field><Label>이름</Label><Value>{user.name}</Value></Field>
        <Field><Label>전화번호</Label><Value>{user.phone}</Value></Field>
        <Field><Label>지점</Label><Value>{user.branch}</Value></Field>
        <Field><Label>생년월일</Label><Value>{user.birth}</Value></Field>
        <Field><Label>NTRP</Label><Value>{user.ntrp}</Value></Field>
        <Field><Label>정지 여부</Label><Value>{user.banned ? '정지됨' : '정상'}</Value></Field>
        <Field><Label>가입일</Label><Value>{user.createdAt}</Value></Field>
        <Field><Label>수정일</Label><Value>{user.updatedAt}</Value></Field>

        <EditButton onClick={() => navigate(`/admin/members/${user.id}/edit`)}>
          수정하기
        </EditButton>
      </Form>
    </Container>
  );
};

export default MemberDetailPage;

const Container = styled.div`
  padding: 2rem;
  background-color: #f2f4f7;
  min-height: 100vh;
`;

const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const Value = styled.div`
  font-size: 1rem;
  color: #222;
`;

const EditButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  background-color: #4f46e5;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
  }
`;
