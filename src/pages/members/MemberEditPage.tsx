import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Member {
  id: number;
  name: string;
  phone: string;
  branch: string;
  role: string;
  gender: string;
  birth: string;
}

const MemberEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<Member | null>(null);

  useEffect(() => {
    // 더미 데이터로 대체 (API 호출 예정)
    const dummy = {
      id: Number(id),
      name: '홍길동',
      phone: '010-1234-5678',
      branch: '강남점',
      role: 'member',
      gender: '남성',
      birth: '1990-01-01',
    };
    setMember(dummy);
    setFormData(dummy);
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData) return;
    console.log('수정된 데이터:', formData);
    navigate(`/admin/members/${formData.id}`);
  };

  if (!formData) return <p>로딩 중...</p>;

  return (
    <Container>
      <h2>회원 정보 수정</h2>
      <FormGroup>
        <label>이름</label>
        <input name='name' value={formData.name} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <label>전화번호</label>
        <input name='phone' value={formData.phone} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <label>지점</label>
        <input name='branch' value={formData.branch} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <label>역할</label>
        <select name='role' value={formData.role} onChange={handleChange}>
          <option value='member'>일반 회원</option>
          <option value='trainer'>트레이너</option>
          <option value='admin'>관리자</option>
        </select>
      </FormGroup>
      <FormGroup>
        <label>성별</label>
        <select name='gender' value={formData.gender} onChange={handleChange}>
          <option value='남성'>남성</option>
          <option value='여성'>여성</option>
        </select>
      </FormGroup>
      <FormGroup>
        <label>생년월일</label>
        <input
          name='birth'
          type='date'
          value={formData.birth}
          onChange={handleChange}
        />
      </FormGroup>

      <ButtonRow>
        <button onClick={() => navigate(-1)}>취소</button>
        <button onClick={handleSubmit}>저장</button>
      </ButtonRow>
    </Container>
  );
};

export default MemberEditPage;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  input,
  select {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }
  button:first-child {
    background: #e5e7eb;
    color: #374151;
  }
  button:last-child {
    background: #4f46e5;
    color: white;
  }
`;
