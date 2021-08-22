import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { State } from '../../shared/models';
import { fetchArticle } from '../../store/actions/actions';
import { NavButtons } from '../../shared/buttons/nav-buttons';

export const ArticlePage: React.FC = () => {
  const { url } = useParams<{url: string;}>();
  const dispatch = useDispatch();
  const article = useSelector((state: State) => state.currentArticle);
  useEffect(() => {
    dispatch(fetchArticle(url));
  }, [url, dispatch]);

  return (
    <div className='container'>
      {!article && (
        <div>Loading articles...</div>
      )}

      {article && (
        <Fragment>
          <h1>{article.titulo}</h1>
          <NavButtons id={article.id} />
          <Divider />
          <div dangerouslySetInnerHTML={{ __html: article.noticia }}></div>
          <Divider />
          <NavButtons id={article.id} />
        </Fragment>
      )}
    </div>
  );
};

