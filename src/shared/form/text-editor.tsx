import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface Props {
  content?: string;
  setTextEditor: Function;
}

export const TextEditor: React.FC<Props> = ({content, setTextEditor}) => {
  const editorRef = useRef({} as any);
  return (
    <Editor
      apiKey='ewrg3dvc9j78a68m199leyfkmu3dhbg1i791rgtv8vgews3k'
      onInit={(evt, editor) => (editorRef.current = setTextEditor(editor))}
      initialValue={content}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};
