import { Link } from 'react-router-dom';
import { FileAddOutlined } from '@ant-design/icons';

export const NewArticleButton = () => {
  return (
    <span>
      <Link className='btn btn-sm btn-outline-secondary' to='/create'>
        <FileAddOutlined /> Crear art&iacute;culo nuevo
      </Link>
    </span>
  );
};
