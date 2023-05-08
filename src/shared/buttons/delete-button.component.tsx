import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../../store/actions/actions';

interface Props {
  id: string;
}
export const DeleteButton: FC<Props> = ({ id }) => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDeleteConfirm = () => {
    confirm({
      title: 'Borrar post',
      icon: <ExclamationCircleOutlined />,
      content:
        '',
      onOk() {
        dispatch(
          deleteArticle({id, navigate})
        );
      },
      onCancel() {},
    });
  };
  return (
    <Space>
      <DeleteOutlined onClick={showDeleteConfirm} />
    </Space>
  );
};


