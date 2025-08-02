import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const TestMarkdown: React.FC = () => {
  const testOutput = `Hello, World!

\`\`\`json
{
  "id": 1,
  "title": "Test Post",
  "body": "This is a test post"
}
\`\`\`

Regular text after JSON.`;

  return (
    <div style={{
      color: '#e0e0e0',
      fontFamily: 'monospace',
      fontSize: '14px',
      margin: 0,
      padding: '8px',
      backgroundColor: '#2d2d2d',
      borderRadius: '4px',
      border: '1px solid #444',
    }}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={tomorrow as any}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: '12px',
                  backgroundColor: '#1e1e1e',
                  borderRadius: '4px',
                  fontSize: '13px',
                  border: '1px solid #444',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          p: ({ children }) => (
            <div style={{ margin: '8px 0' }}>{children}</div>
          ),
        }}
      >
        {testOutput}
      </ReactMarkdown>
    </div>
  );
}; 