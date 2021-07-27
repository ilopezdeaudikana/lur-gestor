import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { TextEditor } from './text-editor';
import { Uploader } from './uploader';
import { updateArticle, createArticle } from '../../store/actions/actions';

import { Article } from '../models';

interface Props {
  article?: Article;
}

export const ArticleForm: React.FC<Props> = ({ article }) => {
  const { titulo, noticia, imagen_frontal, imagen_mini, id } = article || {};
  let tinymce: any;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    const newValues: Article = Object.assign({}, values);
    const imageMini = values.imagen_mini
      ? await readFileAsync(values.imagen_mini[0].originFileObj)
      : null;
    const imageFrontal = values.imagen_frontal
      ? await readFileAsync(values.imagen_frontal[0].originFileObj)
      : null;
    if (imageMini) {
      newValues.imagen_mini = {
        filename: values.imagen_mini[0].name,
        filetype: values.imagen_mini[0].type,
        value: imageMini,
      };
    }
    if (imageFrontal) {
      newValues.imagen_frontal = {
        filename: values.imagen_frontal[0].name,
        filetype: values.imagen_frontal[0].type,
        value: imageFrontal,
      };
    }
    if (tinymce) {
      newValues.noticia = tinymce.getContent();
    }
    if (id) {
      dispatch(updateArticle({ ...newValues, id }));
    } else {
      dispatch(createArticle({ ...newValues }));
    }
  };
  if (article) {
    form.setFieldsValue({
      titulo,
      imagen_frontal_text: imagen_frontal,
      imagen_mini_text: imagen_mini,
    });
  }

  const readFileAsync = (file: any) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve((reader.result as string).split(',')[1]);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const setTextArea = (e: any) => (tinymce = e);

  return (
    <Fragment>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='T&iacute;tulo'
          name='titulo'
          rules={[
            {
              required: true,
              message: 'Please input your titulo!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label='Imagen grande' name='imagen_frontal_text'>
          <Input />
        </Form.Item>
        <Uploader name='imagen_frontal' label='Imagen Grande' />
        <Form.Item label='Imagen pequeña' name='imagen_mini_text'>
          <Input />
        </Form.Item>

        <Uploader name='imagen_mini' label='Miniatura' />
        <TextEditor
          noticia={noticia}
          setTextEditor={(e: any) => setTextArea(e)}
        />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Publicar Art&iacute;culo
          </Button>
        </Form.Item>
      </Form>
      <hr />
    </Fragment>
  );
};
