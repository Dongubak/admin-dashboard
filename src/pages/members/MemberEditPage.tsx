import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

type GenderType = '남' | '여';
type BranchType = '신시가지점' | '에코시티점' | '혁신도시점';
type NTRPType =
  | '0.1'
  | '0.5'
  | '0.7'
  | '1.0'
  | '1.5'
  | '2.0'
  | '2.5'
  | '3.0'
  | '3.5'
  | '4.0 이상';
type RefundBankType =
  | '한국은행'
  | '농협은행'
  | '수협은행'
  | '산업은행'
  | '기업은행'
  | 'KEB하나은행'
  | 'KB국민은행'
  | '신한은행'
  | '우리은행'
  | 'SC제일은행'
  | 'DGB대구은행'
  | 'BNK부산은행'
  | 'BNK경남은행'
  | '전북은행'
  | '제주은행'
  | '카카오뱅크'
  | '케이뱅크'
  | '토스뱅크'
  | '우체국예금보험'
  | '한국씨티은행';
type ReceiptInfoType = '발급' | '미발급';
type ReceiptTypeType = '개인' | '법인';
type RoleType = 'MEMBER' | 'TRAINER' | 'MANAGER';

interface MemberFormData {
  identifier: string;
  password: string;
  passwordConfirm: string;
  name: string;
  gender: GenderType;
  phone: string;
  branch: BranchType;
  age: number;
  ntrp: NTRPType;
  refundAccount: string;
  refundBank: RefundBankType;
  receiptInfo: ReceiptInfoType;
  receiptType: ReceiptTypeType;
  receiptNumber: string;
  trainerId: string;
  role: RoleType;
  banned: boolean;
}

const initialData: MemberFormData = {
  identifier: '',
  password: '',
  passwordConfirm: '',
  name: '',
  gender: '남',
  phone: '',
  branch: '신시가지점',
  age: 20,
  ntrp: '1.0',
  refundAccount: '',
  refundBank: 'KB국민은행',
  receiptInfo: '미발급',
  receiptType: '개인',
  receiptNumber: '',
  trainerId: '',
  role: 'MEMBER',
  banned: false,
};

const MemberEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MemberFormData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;

    // 체크박스만 별도로 처리
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    console.log('제출할 데이터:', formData);
    navigate(`/admin/members/${id}`);
  };

  return (
    <Container>
      <h2>회원 정보 수정</h2>
      {[
        { label: '아이디', name: 'identifier', type: 'text', minLength: 8 },
        { label: '비밀번호', name: 'password', type: 'password', minLength: 8 },
        {
          label: '비밀번호 확인',
          name: 'passwordConfirm',
          type: 'password',
          minLength: 8,
        },
        { label: '이름', name: 'name', type: 'text', maxLength: 5 },
        {
          label: '전화번호',
          name: 'phone',
          type: 'tel',
          placeholder: '예: 010-1234-5678',
        },
        { label: '나이', name: 'age', type: 'number', min: 1, max: 80 },
        {
          label: '환불 계좌번호',
          name: 'refundAccount',
          type: 'text',
          pattern: '[0-9]*',
        },
        { label: '영수증 번호', name: 'receiptNumber', type: 'text' },
        {
          label: '트레이너 아이디',
          name: 'trainerId',
          type: 'text',
          minLength: 8,
        },
      ].map(({ label, name, ...rest }) => (
        <FormGroup key={name}>
          <label>{label}</label>
          <input
            name={name}
            value={(formData as any)[name]}
            onChange={handleChange}
            {...rest}
          />
        </FormGroup>
      ))}

      {/* 선택 필드들 */}
      <FormGroup>
        <label>성별</label>
        <select name='gender' value={formData.gender} onChange={handleChange}>
          <option value='남'>남자</option>
          <option value='여'>여자</option>
        </select>
      </FormGroup>

      <FormGroup>
        <label>지점</label>
        <select name='branch' value={formData.branch} onChange={handleChange}>
          <option value='신시가지점'>신시가지점</option>
          <option value='에코시티점'>에코시티점</option>
          <option value='혁신도시점'>혁신도시점</option>
        </select>
      </FormGroup>

      <FormGroup>
        <label>NTRP</label>
        <select name='ntrp' value={formData.ntrp} onChange={handleChange}>
          {[
            '0.1',
            '0.5',
            '0.7',
            '1.0',
            '1.5',
            '2.0',
            '2.5',
            '3.0',
            '3.5',
            '4.0 이상',
          ].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup>
        <label>환불 계좌 은행</label>
        <select
          name='refundBank'
          value={formData.refundBank}
          onChange={handleChange}
        >
          {[
            '한국은행',
            '농협은행',
            '수협은행',
            '산업은행',
            '기업은행',
            'KEB하나은행',
            'KB국민은행',
            '신한은행',
            '우리은행',
            'SC제일은행',
            'DGB대구은행',
            'BNK부산은행',
            'BNK경남은행',
            '전북은행',
            '제주은행',
            '카카오뱅크',
            '케이뱅크',
            '토스뱅크',
            '우체국예금보험',
            '한국씨티은행',
          ].map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup>
        <label>현금영수증 발급 여부</label>
        <select
          name='receiptInfo'
          value={formData.receiptInfo}
          onChange={handleChange}
        >
          <option value='발급'>발급</option>
          <option value='미발급'>미발급</option>
        </select>
      </FormGroup>

      <FormGroup>
        <label>영수증 타입</label>
        <select
          name='receiptType'
          value={formData.receiptType}
          onChange={handleChange}
        >
          <option value='개인'>개인</option>
          <option value='법인'>법인</option>
        </select>
      </FormGroup>

      <FormGroup>
        <label>권한</label>
        <select name='role' value={formData.role} onChange={handleChange}>
          <option value='MEMBER'>일반 회원</option>
          <option value='TRAINER'>트레이너</option>
          <option value='MANAGER'>관리자</option>
        </select>
      </FormGroup>

      <FormGroup>
        <label>이용정지</label>
        <input
          type='checkbox'
          name='banned'
          checked={formData.banned}
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
  max-width: 700px;
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
