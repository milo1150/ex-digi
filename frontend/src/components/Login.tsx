import React from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const Content = styled.div`
  width: 200px;
  text-align: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute; ;
`;

const Form = styled.form`
  margin: 4px;
`;

const InputBox = styled.div`
  margin-bottom: 10px;
`;

const ActionBox = styled.div`
  display: flex;
`;

const P2 = styled.p`
  font-size: 20px;
`;

const Login: React.FC = () => {
  const history = useHistory();
  return (
    <Content>
      <P2>Login</P2>
      <Form>
        <InputBox>
          <Input style={{ height: '40px' }} placeholder="Username" />
        </InputBox>
        <InputBox>
          <Input style={{ height: '40px' }} placeholder="Password" />
        </InputBox>
        <ActionBox>
          <Button
            style={{ marginRight: '10px', width: '100%' }}
            type="default"
            danger
            onClick={() => history.push('/register')}
          >
            Register
          </Button>
          <Button style={{ width: '100%' }} type="primary">
            Login
          </Button>
        </ActionBox>
      </Form>
    </Content>
  );
};

export default Login;
