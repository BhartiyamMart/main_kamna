'use client';

import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useRef } from 'react';

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
}

export default function TextEditor({ value, onChange, height = 500 }: TextEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      apiKey="n3py7va1dt6lc0yddhvjlz9w5wtkzio8ivfjdtypui7d4mt1"
      onInit={(_: any, editor: any) => {
        editorRef.current = editor as TinyMCEEditor;
      }}
      value={value}
      init={{
        height: height,
        menubar: false,
        statusbar: false,
        branding: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | bold italic underline | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | link image media | ' +
          'table | code | removeformat',

        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; overflow-x: hidden; word-break: break-word; }',

        setup: (editor: any) => {
          editor.on('SkinLoaded', () => {
            const popup = document.querySelector('.tox-notifications-container');
            if (popup) popup.remove();
          });
        },
      }}
      onEditorChange={(content: any) => onChange(content)}
    />
  );
}
