import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { setAuthData } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const baseURL = process.env.REACT_APP_BACKEND_API;

const Login = () => {
  const [identifier, setIdentifier] = useState('testusersdd');
  const [password, setPassword] = useState('aaaaaaaa');
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/auth/signin`, {
        identifier,
        password,
      });

      const { token, RT, user } = res.data;
      setAuthData(token, RT, user);
      setAuth(token, RT, user);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Form>
        <InputGroup>
          <Label htmlFor="identifier">아이디</Label>
          <Input
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </Form>
    </Container>
  );
};

export default Login;

// ✅ styled-components 정의

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f4f7;
`;

const Form = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  box-sizing: border-box;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4338ca;
  }
`;