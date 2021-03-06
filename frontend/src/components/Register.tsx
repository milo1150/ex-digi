import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { UserInput } from '../Typescript/FormType';
import { useHistory } from 'react-router-dom';
import axios from '../api/axios';

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
`;

const Register: React.FC = () => {
  const [errMsg, setErrMsg] = useState<string>('');
  const history = useHistory();
  const { handleSubmit, control, errors } = useForm<UserInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const submitHandler = async (data: UserInput) => {
    try {
      axios.post('/api/v1/register', data).then((res) => {
        const data: { message: string } = res.data;
        if (res.status === 200) {
          setErrMsg('');
          history.push('/login');
        } else if (res.status === 208) {
          setErrMsg(data.message);
        }
      });
    } catch (error) {
      throw new Error('Some thing wrong');
    }
  };
  return (
    <Content>
      <P2>Register</P2>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <InputBox>
          <Controller
            control={control}
            name="username"
            rules={{ required: true }}
            render={({ onChange, value }) => (
              <Input
                style={{ height: '40px' }}
                placeholder="Username"
                onChange={onChange}
                value={value} // reference from defaultValues
              />
            )}
          />
          {errors.username && <SpanError>username required</SpanError>}
        </InputBox>
        <InputBox>
          <Controller
            control={control}
            name="password"
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
          {errors.password && <SpanError>password required</SpanError>}
        </InputBox>
        <ActionBox>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            Register
          </Button>
        </ActionBox>
      </Form>
      <SpanError>{errMsg}</SpanError>
    </Content>
  );
};

export default Register;
