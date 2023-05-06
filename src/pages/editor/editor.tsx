import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Space } from 'antd';
import { NavButtons } from '../../shared/buttons/nav-buttons';
import { ArticleForm } from '../../shared/form/article-form';
import { State } from '../../shared/models';

export const EditorPage: React.FC = () => {
  const currentArticle = useSelector((state: State) => state.currentArticle);
  const { item: article } = currentArticle

  const { id } = article;

  if (!article.id) {
    return <Navigate to='/' />;
  }

  return (
    <div className='container'>
      {!id && <div>Loading articles...</div>}

      {id && (
        <Space direction='vertical'>
          <NavButtons id={id} />
          <ArticleForm article={article} />
        </Space>
      )}
    </div>
  );
};
