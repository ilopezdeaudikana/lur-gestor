import { Link } from 'react-router-dom';
import { FileAddOutlined } from '@ant-design/icons';

export const NewArticleButton = () => {
  return (
    <span>
      <Link to='/create'>
        <FileAddOutlined /> Crear art&iacute;culo nuevo
      </Link>
    </span>
  );
};
