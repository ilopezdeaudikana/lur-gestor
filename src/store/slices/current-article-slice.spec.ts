import currentArticleReducer, { setArticle } from './current-article-slice'

import { Article } from '../../shared/models'

describe('Current Article reducer', () => {
  const initialState: { item: Article } = {
    item: {
      id: '',
      url: '',
      title: '',
      description: '',
      content: '',
      image_main: '',
      image_mini: ''
    }
  }
  it('should handle initial state', () => {
    expect(currentArticleReducer(undefined, { type: 'unknown' })).toEqual({
      item: {
        id: '',
        url: '',
        title: '',
        description: '',
        content: '',
        image_main: '',
        image_mini: ''
      }
    })
  })

  it('should set current article', () => {
    const article: Article = {
      title: 'Dummy',
      id: '1',
      url: 'dummy-url',
      content: 'bla bla bla...',
      description: '',
      image_main: '',
      image_mini: ''
    }

    const actual = currentArticleReducer(initialState, setArticle(article))
    expect(actual.item).toEqual(article)
  })
})
