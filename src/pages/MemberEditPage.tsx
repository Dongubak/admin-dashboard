import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MemberEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (id === '1') {
      setName('김유빈');
      setPhone('010-1234-5678');
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('수정된 정보:', name, phone);
    navigate(`/admin/members/${id}`);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>회원 정보 수정</Title>
        <Field>
          <Label>이름</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field>
          <Label>전화번호</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <SaveButton type="submit">저장하기</SaveButton>
      </Form>
    </Container>
  );
};

export default MemberEditPage;

const Container = styled.div`
  padding: 2rem;
  background-color: #f2f4f7;
  min-height: 100vh;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Field = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
