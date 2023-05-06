import { runSaga } from 'redux-saga';
import {
  fetchArticles,
  ARTICLES_FETCH_FAILED,
} from './articles.saga';
import * as articlesService from '../../shared/services/articles.service';

const dummyResponse = {
  data: {
    list: [
      {
        id: 'string',
        url: 'string',
        title: 'string',
        content: 'string',
        image_main: 'any',
        image_mini: 'any',
      },
    ],
    total: 1,
  },
};
describe('fetchArticles', () => {
  it('should fetch articles and dispatch success action', async () => {
    const spy = jest.spyOn(articlesService, 'getArticles').mockImplementation(
      () =>
        new Promise((resolve) => {
          return resolve(dummyResponse);
        })
    );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchArticles as any,
      {
        payload: {
          filters: { limit: 10, offset: 0 },
        },
      }
    );

    expect(spy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      { type: 'lur-cms/articles/setArticles', payload: dummyResponse.data },
    ]);
  });

  it('should call api and dispatch error action', async () => {
    const error = { message: 'ERROR' };
    const spy = jest.spyOn(articlesService, 'getArticles')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, fetchArticles as any,
    {
      payload: {
        filters: { limit: 10, offset: 0 },
      },
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([{ type: ARTICLES_FETCH_FAILED, message: 'ERROR' }]);
  });
});
