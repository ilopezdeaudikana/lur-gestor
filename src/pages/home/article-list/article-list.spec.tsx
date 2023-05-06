import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, screen } from '@testing-library/react';
import { ArticleList } from './article-list';
import { ARTICLES_FETCH_REQUESTED } from '../../../store/sagas/articles.saga';

afterEach(cleanup);
const middlewares: any = [];
const mockStore = configureStore(middlewares);
describe('ArticleList', () => {
  it('Should fetch articles', async () => {
    const initialState = {
      articles: { list: [], total: 0 },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ArticleList limit={10} />
      </Provider>
    );
    const loading = screen.getByText(/No articles are here/);
    const actions = store.getActions();
    const expectedPayload = {
      type: ARTICLES_FETCH_REQUESTED,
      payload: { filters: { limit: 10, offset: 0 } },
    };
    expect(loading).toBeInTheDocument();
    expect(actions).toEqual([expectedPayload]);
  });

  it('Should display articles', async () => {
    const initialState = {
      articles: {
        list: [
          {
            titulo: 'Dummy',
            id: '1',
            url: 'dummy-url',
          },
        ],
        total: 1,
      },
    };
    const store = mockStore(initialState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ArticleList limit={10} />
        </Provider>
      </BrowserRouter>
    );
    const title = screen.getByText(/Dummy/);
    expect(title).toBeInTheDocument();
  });
});
