import { Form, Input, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/auth/auth';
import * as jsMd5 from 'js-md5';
import { message } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;

const isDev = process.env.NODE_ENV === 'development';

interface User {
  user: string; password: string 
}

export const Login = () => {
  const history = useNavigate();
  const location: { state: { from: any } } = useLocation();
  const { signin } = useAuth();

  const { from } = location.state || { from: { pathname: '/' } };

  const apiRequest = async (values: User) => {
    values.password = jsMd5.hex(values.password);
    const url = `${API_URL}/users`;
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response: Response) => response.json())
      .then((auth: { user: string }) => {
        if (auth.user !== 'invalid') {
          history(from, { replace: true });
        } else {
          message.error('Auth error');
        }
      })
      .catch((error) => {
        message.error('Auth error');
      });
  };

  const onFinish = (values: User) => {
    signin(() => {
      if(isDev) {
        history(from, { replace: true });
      } else {
        apiRequest(values);
      }
    });
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label='User'
        name='user'
        rules={[{ required: true, message: 'Please input your user!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
