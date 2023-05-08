import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
interface Props {
  name: string;
  label: string;
}

export const Uploader: React.FC<Props> = ({ name, label }) => {
  const fileProps = {
    beforeUpload() {
      return false;
    },
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Form.Item
        name={name}
        valuePropName='fileList'
        getValueFromEvent={normFile}
        noStyle
      >
        <Upload {...fileProps}>
          <Button icon={<UploadOutlined />}>{label}</Button>
        </Upload>
      </Form.Item>
    </>
  );
};
