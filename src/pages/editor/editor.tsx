import { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavButtons } from '../../shared/buttons/nav-buttons';
import { ArticleForm } from '../../shared/form/article-form';
import { Article, State } from '../../shared/models';

interface Props {
  currentArticle: Article;
  save: Function;
}

export const EditorPage: React.FC<Props> = () => {
  const article = useSelector((state: State) => state.currentArticle);
  const { id } = article;

  if (!article.id) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      {!id && <div>Loading articles...</div>}

      {id && (
        <Fragment>
          <NavButtons id={id} />
          <ArticleForm article={article} />
        </Fragment>
      )}
    </div>
  );
};
