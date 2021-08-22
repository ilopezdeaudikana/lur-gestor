import './App.scss';
import 'antd/dist/antd.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute, ProvideAuth } from './shared/auth/auth';
import { store } from './store/store';
import {
  Login,
  EditorPage,
  /* Four04Page,*/
  CreatePage,
  ArticlePage,
  Home,
} from './pages';
import styled from 'styled-components';
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5rem;
  color: #444;
`;

const PageNotFound = () => {
  return (
    <div id='wrapper'>
      <div id='info'>
        <h3>This page could not be found</h3>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ProvideAuth>
        <Provider store={store}>
          <div data-testid='App' className='App'>
            <Wrapper>
              <Switch>
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute
                  exact
                  path='/article/:url'
                  component={ArticlePage}
                />
                <PrivateRoute exact path='/create' component={CreatePage} />
                <PrivateRoute exact path='/editor' component={EditorPage} />
                <PrivateRoute
                  exact
                  path='/editor/:url'
                  component={EditorPage}
                />
                <Route component={PageNotFound} />
              </Switch>
            </Wrapper>
          </div>
        </Provider>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;

