import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { UserData } from '../store/actions/Form';
import axios from '../api/axios';
import { message } from 'antd';

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
  margin-bottom: 0px;
`;

const Profile: React.FC = () => {
  const _dispatch = useDispatch();
  const data: UserData = useSelector<UserData, UserData>((state) => state);
  // console.log(data);
  const [name, setName] = useState<string>(data.name);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (!data.uid) {
      history.replace('/');
    }
  }, [data.uid, history]);

  const logoutHandler = () => {
    _dispatch({ type: 'CLEAR' });
    history.replace('/');
  };

  const updateName = async (name: string) => {
    const uData: { uid: string; name: string } = {
      uid: data.uid,
      name: name,
    };
    setLoading(true);
    await axios
      .patch('/api/v1/updateprofile', uData)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          message.success('Updated', 2);
        }
      })
      .catch((err) => {
        throw new Error();
      });
  };

  return (
    <Content>
      <P2>Profile</P2>
      <Form>
        <p>Login as : {data.username}</p>
        <InputBox>
          <Input
            style={{ height: '40px' }}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputBox>
        <ActionBox>
          <Button
            style={{ marginRight: '10px', width: '100%' }}
            type="primary"
            onClick={() => logoutHandler()}
            disabled={loading ? true : false}
            danger
          >
            Logout
          </Button>
          <Button
            style={{ width: '100%' }}
            type="primary"
            onClick={() => updateName(name)}
            loading={loading}
          >
            Update
          </Button>
        </ActionBox>
      </Form>
    </Content>
  );
};

export default Profile;
