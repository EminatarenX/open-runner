import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { EditorConfig } from '../../shared/types';
import { MONACO_EDITOR_OPTIONS } from '../../shared/constants';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  config: EditorConfig;
  onEditorReady?: (editor: any) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  config,
  onEditorReady,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure Vim mode if enabled
    if (config.vimMode) {
      // Note: Vim mode requires additional setup with monaco-vim
      // For now, we'll use basic editor configuration
      editor.updateOptions({
        ...MONACO_EDITOR_OPTIONS,
        theme: config.theme,
        fontSize: config.fontSize,
      });
    } else {
      editor.updateOptions({
        ...MONACO_EDITOR_OPTIONS,
        theme: config.theme,
        fontSize: config.fontSize,
      });
    }

    // Set up keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Trigger save action
      onChange(editor.getValue());
    });

    onEditorReady?.(editor);
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className="code-editor" style={{ height: '100%', width: '100%' }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          ...MONACO_EDITOR_OPTIONS,
          theme: config.theme,
          fontSize: config.fontSize,
        }}
      />
    </div>
  );
}; 