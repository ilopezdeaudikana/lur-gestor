import './App.scss'
import 'antd/dist/reset.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PrivateRoute, ProvideAuth } from './shared/auth/auth'
import { store } from './store/store'
import {
  Login,
  EditorPage,
  CreatePage,
  ArticlePage,
  Home
} from './pages'
import styled from 'styled-components'
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5rem;
  color: #444;
`

const PageNotFound = () => {
  return (
    <div id='wrapper'>
      <div id='info'>
        <h3>This page could not be found</h3>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ProvideAuth>
        <Provider store={store}>
          <div data-testid='App' className='App'>
            <Wrapper>
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route
                  path='/'
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/article/:url'
                  element={
                    <PrivateRoute>
                      <ArticlePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/article/:url'
                  element={
                    <PrivateRoute>
                      <CreatePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/editor'
                  element={
                    <PrivateRoute>
                      <EditorPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/editor/:url'
                  element={
                    <PrivateRoute>
                      <EditorPage />
                    </PrivateRoute>
                  }
                />

                <Route element={<PageNotFound />} />
              </Routes>
            </Wrapper>
          </div>
        </Provider>
      </ProvideAuth>
    </BrowserRouter>
  )
}

export default App
