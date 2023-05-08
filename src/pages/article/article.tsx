import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Divider } from 'antd'
import { State } from '../../shared/models'
import { fetchArticle } from '../../store/actions/actions'
import { NavButtons } from '../../shared/buttons/nav-buttons'

export const ArticlePage: React.FC = () => {
  const { url } = useParams<{ url: string }>()
  const dispatch = useDispatch()
  const currentArticle = useSelector((state: State) => {
    return state.currentArticle
  })

  const { item: article } = currentArticle
  
  useEffect(() => {
    if (url) {
      dispatch(fetchArticle(url))
    }
  }, [url, dispatch])

  return (
    <div className='container'>
      {!article && <div>Loading articles...</div>}

      {article && (
        <>
          <h1>{article.title}</h1>
          <NavButtons id={article.id} />
          <Divider />
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
          <Divider />
          <NavButtons id={article.id} />
        </>
      )}
    </div>
  )
}
