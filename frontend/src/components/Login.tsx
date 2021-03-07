import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { UserInput } from '../Typescript/FormType';
import axios from '../api/axios';
import { useDispatch } from 'react-redux';

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
const SpanError = styled.span`
  color: red;
  margin-bottom: 3px;
`;

const Login: React.FC = () => {
  const [errMsg, setErrMsg] = useState<string>('');
  const history = useHistory();
  const _dispatch = useDispatch();
  const { errors, handleSubmit, control } = useForm<UserInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    _dispatch({ type: 'CLEAR' });
  }, [_dispatch]);

  const loginHandler = async (data: UserInput) => {
    await axios
      .post('/api/v1/login', data)
      .then((res) => {
        setErrMsg('');
        console.log(res);
        _dispatch({ type: 'UPDATE_INFO', payload: res.data.data });
        history.push('/profile');
      })
      .catch((err) => {
        setErrMsg('Try again');
      });
  };

  return (
    <Content>
      <P2>Login</P2>
      <Form onSubmit={handleSubmit(loginHandler)}>
        <InputBox>
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ onChange, value }) => (
              <Input
                style={{ height: '40px' }}
                placeholder="Username"
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.username && <SpanError>username is required</SpanError>}
        </InputBox>
        <InputBox>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ onChange, value }) => (
              <Input
                style={{ height: '40px' }}
                placeholder="Password"
                onChange={onChange}
                value={value}
                type="password"
              />
            )}
          />
          {errors.password && <SpanError>password is required</SpanError>}
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
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            Login
          </Button>
        </ActionBox>
        <SpanError>{errMsg}</SpanError>
      </Form>
    </Content>
  );
};

export default Login;
