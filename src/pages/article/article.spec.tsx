import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import { ArticlePage } from './article';
import { ARTICLE_FETCH_REQUESTED } from '../../store/sagas/articles.saga';

afterEach(cleanup);
const middlewares: any = [];
const mockStore = configureStore(middlewares);

const fakeProps = {
  location: 'any',
  history: 'any',
  limit: 10,
  match: { params: { url: 'dummy' } },
};
describe('Article', () => {
  it('Should fetch an article', async () => {
    const initialState = {};
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ArticlePage {...fakeProps} />
      </Provider>
    );
    const actions = store.getActions();
    const expectedPayload = { type: ARTICLE_FETCH_REQUESTED, payload: 'dummy' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('Should display the currentArticle', async () => {
    const initialState = {
      currentArticle: {
        titulo: 'Dummy',
        id: '1',
        url: 'dummy-url',
        noticia: 'bla bla bla...',
      },
    };
    const store = mockStore(initialState);
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <ArticlePage {...fakeProps} />
        </Provider>
      </Router>
    );
    const title = getByText(/bla bla bla.../);
    expect(title).toBeInTheDocument();
  });
});
