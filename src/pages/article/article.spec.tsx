import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { render, cleanup, screen } from '@testing-library/react'
import { ArticlePage } from './article'
import { ARTICLE_FETCH_REQUESTED } from '../../store/sagas/articles.saga'
jest.mock('react-router-dom', () => ({
  useParams: () => ({ url: 'url-to-test' }),
  useNavigate: jest.fn(),
  Link: () => '<div></div>'
}))
afterEach(cleanup)
const middlewares: any = []
const mockStore = configureStore(middlewares)

describe('Article', () => {
  it('Should fetch an article', async () => {
    const initialState = { currentArticle: { item: {} } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <ArticlePage />
      </Provider>
    )
    const actions = store.getActions()
    const expectedPayload = {
      type: ARTICLE_FETCH_REQUESTED,
      payload: 'url-to-test'
    }
    expect(actions).toEqual([expectedPayload])
  })

  it('Should display the currentArticle', async () => {
    const initialState = {
      currentArticle: {
        item: {
          title: 'Dummy',
          id: '1',
          url: 'dummy-url',
          content: 'bla bla bla...'
        }
      }
    }
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <ArticlePage />
      </Provider>
    )
    const title = screen.getByText(/bla bla bla.../)
    expect(title).toBeInTheDocument()
  })
})
