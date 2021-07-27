import { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../shared/models';
import { fetchArticle } from '../../store/actions/actions';
import { NavButtons } from '../../shared/buttons/nav-buttons';

interface Props {
  match: any;
  location: any;
  history: any;
  limit: number;
}

export const ArticlePage: React.FC<Props> = ({ match }) => {
  const { url } = match.params;
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
          <hr />
          <div dangerouslySetInnerHTML={{ __html: article.noticia }}></div>
          <hr />
          <NavButtons id={article.id} />
        </Fragment>
      )}
    </div>
  );
};

export const ArticlePageWithRouter = withRouter(ArticlePage);
