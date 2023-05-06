import { Article, ArticleState } from '../../shared/models'
import articlesReducer, {
  setArticles,
  updateArticle,
  createArticle,
  deleteArticle
} from './articles-slice'

describe('Articles reducer', () => {
  const initialState: ArticleState = {
    total: 0,
    list: []
  }
  it('should handle initial state', () => {
    expect(articlesReducer(undefined, { type: 'unknown' })).toEqual({
      total: 0,
      list: []
    })
  })

  it('should set articles', () => {
    const articles: Article[] = [
      {
        title: 'Dummy',
        id: '1',
        url: 'dummy-url',
        content: 'bla bla bla...',
        description: '',
        image_main: '',
        image_mini: ''
      }
    ]
    const actual = articlesReducer(initialState, setArticles({ list: articles, total: 1 }))
    expect(actual.list).toEqual(articles)
  })

  it('should update an article', () => {
    const state = {
      list: [
        {
          title: 'Dummy',
          id: '1',
          url: 'dummy-url',
          content: 'bla bla bla...',
          description: '',
          image_main: '',
          image_mini: ''
        }
      ],
      total: 1
    }
    const action = {
        title: 'Dummy Edited',
        id: '1',
        url: 'dummy-url',
        content: 'bla bla bla...',
        description: '',
        image_main: '',
        image_mini: ''
      }
    const actual = articlesReducer(state, updateArticle(action))
    expect(actual.list[0].title).toBe('Dummy Edited')
  })

  it('should create an article', () => {
    const state = {
      list: [],
      total: 0
    }
    const action = {
        title: 'Dummy Edited',
        id: '1',
        url: 'dummy-url',
        content: 'bla bla bla...',
        description: '',
        image_main: '',
        image_mini: ''
      }
    const actual = articlesReducer(state, createArticle(action))
    expect(actual.list[0].title).toBe('Dummy Edited')
  })

  it('should delete an article', () => {
    const state = {
      list: [{
        title: 'Dummy Edited',
        id: '1',
        url: 'dummy-url',
        content: 'bla bla bla...',
        description: '',
        image_main: '',
        image_mini: ''
      }],
      total: 1
    }
    const actual = articlesReducer(state, deleteArticle('1'))
    expect(actual.list).toEqual([])
  })
})
