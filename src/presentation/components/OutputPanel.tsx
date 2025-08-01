import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeExecutionResult } from '../../shared/types';

interface OutputPanelProps {
  result: CodeExecutionResult | null;
  isExecuting: boolean;
  error: string | null;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  result,
  isExecuting,
  error,
}) => {
  const formatExecutionTime = (time: number) => {
    return `${time.toFixed(2)}ms`;
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString();
  };

  const processOutput = (output: string) => {
    // Split the output by lines
    const lines = output.split('\n');
    const processedLines: React.ReactNode[] = [];
    let inJsonBlock = false;
    let jsonContent: string[] = [];

    for (const line of lines) {
      if (line.trim() === '```json') {
        inJsonBlock = true;
        jsonContent = [];
        continue;
      }

      if (line.trim() === '```' && inJsonBlock) {
        inJsonBlock = false;
        // Render the JSON block with syntax highlighting
        processedLines.push(
          <SyntaxHighlighter
            key={`json-${processedLines.length}`}
            style={tomorrow}
            language="json"
            PreTag="div"
            customStyle={{
              margin: '8px 0',
              padding: '12px',
              backgroundColor: '#1e1e1e',
              borderRadius: '4px',
              fontSize: '13px',
              border: '1px solid #444',
            }}
          >
            {jsonContent.join('\n')}
          </SyntaxHighlighter>
        );
        continue;
      }

      if (inJsonBlock) {
        jsonContent.push(line);
      } else {
        // Mostrar cada línea de texto como un bloque separado, aunque esté vacía
        processedLines.push(
          <div
            key={`line-${processedLines.length}`}
            style={{ margin: '4px 0' }}
          >
            {line}
          </div>
        );
      }
    }

    return processedLines;
  };

  return (
    <div className="output-panel" style={{ height: '100%', padding: '16px' }}>
      <div className="output-header" style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: 0, color: '#e0e0e0' }}>Output</h3>
        {result && (
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Executed at {formatTimestamp(result.timestamp)} in{' '}
            {formatExecutionTime(result.executionTime)}
          </div>
        )}
      </div>

      <div
        className="output-content"
        style={{ height: 'calc(100% - 60px)', overflow: 'auto' }}
      >
        {isExecuting && (
          <div style={{ color: '#ffd700', fontStyle: 'italic' }}>
            ⏳ Executing...
          </div>
        )}

        {error && (
          <div
            style={{
              color: '#ff6b6b',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
            }}
          >
            ❌ Error: {error}
          </div>
        )}

        {result && !error && result.output && (
          <div
            style={{
              color: '#e0e0e0',
              fontFamily: 'monospace',
              fontSize: '14px',
              margin: 0,
              padding: '8px',
              backgroundColor: '#2d2d2d',
              borderRadius: '4px',
              border: '1px solid #444',
            }}
          >
            {processOutput(result.output)}
          </div>
        )}

        {result && !error && !result.output && (
          <div style={{ color: '#888', fontStyle: 'italic' }}>
            ℹ️ No output generated
          </div>
        )}

        {!result && !isExecuting && !error && (
          <div style={{ color: '#888', fontStyle: 'italic' }}>
            💡 Run your code to see the output here
          </div>
        )}

        {/* Debug information */}
        {import.meta.env.MODE === 'development' && (
          <div
            style={{
              marginTop: '16px',
              padding: '8px',
              backgroundColor: '#1a1a1a',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#888',
            }}
          >
            <strong>Debug Info:</strong>
            <br />
            Is Executing: {isExecuting.toString()}
            <br />
            Has Result: {(result !== null).toString()}
            <br />
            Has Error: {(error !== null).toString()}
            <br />
            Result Output Length: {result?.output?.length || 0}
            <br />
            Execution Time:{' '}
            {result?.executionTime
              ? formatExecutionTime(result.executionTime)
              : 'N/A'}
          </div>
        )}
      </div>
    </div>
  );
};
