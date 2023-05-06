import { FC, useState, useContext, createContext } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  path?: string;
  children?: any;
}

interface UserContext {
  user: string;
  signin: (cb: any) => void;
}

export const useProvideAuth = () => {
  const [user, setUser] = useState('');

  const signin = (cb: any) => {
    setUser('user');
    cb();
  };

  return {
    user,
    signin,
  };
};

const authContext = createContext({} as UserContext);

export const ProvideAuth: FC<Props> = ({ children }) => {
  const auth: UserContext = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export const PrivateRoute = ({ children }: { children: any }) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

