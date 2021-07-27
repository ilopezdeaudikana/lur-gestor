import { FC, useState, useContext, createContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  path?: string;
  children?: any;
}

interface PrivateRouteProps extends Props {
  exact: boolean;
  component?: any;
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

export const PrivateRoute: FC<PrivateRouteProps> = (
  props: PrivateRouteProps
) => {
  const { component: Component, children, ...rest } = props;
  const auth: UserContext = useAuth();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        auth.user ? (
          Component ? (
            <Component {...routeProps} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
