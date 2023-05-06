import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Article } from '../../shared/models'

const initialState: { item: Article }  = {
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

const currentArticleSlice = createSlice({
  name: 'lur-cms/currentArticle',
  initialState,
  reducers: {
    setArticle(state, action: PayloadAction<Article>) {
      state.item = { ...action.payload }
    }
  }
})

export const { setArticle } = currentArticleSlice.actions
export default currentArticleSlice.reducer
