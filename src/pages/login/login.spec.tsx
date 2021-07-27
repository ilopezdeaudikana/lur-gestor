import { Login } from './login';
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('../../shared/auth/auth', () => ({
  useAuth: () => ({ signin: jest.fn() }),
}));

// Couldn't test onFinish
// https://github.com/ant-design/ant-design/issues/21272

describe('Login Form', () => {
  it('Password validation', async () => {
    const { getByLabelText, getByText } = render(<Login />, {
      wrapper: MemoryRouter,
    });
    fireEvent.change(getByLabelText('User'), {
      target: { value: 'Text' },
    });
    fireEvent.submit(getByText('Submit'));
    await waitFor(() => getByText(/Please input your password/i));
  });

  it('Username validation', async () => {
    const { getByLabelText, getByText } = render(<Login />, {
      wrapper: MemoryRouter,
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'Text' },
    });
    fireEvent.submit(getByText('Submit'));
    await waitFor(() => getByText(/Please input your user/i));
  });
});
