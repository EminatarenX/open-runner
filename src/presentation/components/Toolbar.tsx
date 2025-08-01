import React from 'react';

interface ToolbarProps {
  onRun: () => void;
  onSave: () => void;
  isExecuting: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onRun,
  onSave,
  isExecuting,
  isSaving,
  lastSavedAt,
}) => {
  const formatLastSaved = (date: Date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="toolbar" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      backgroundColor: '#1e1e1e',
      borderBottom: '1px solid #333',
    }}>
      <button
        onClick={onRun}
        disabled={isExecuting}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isExecuting ? 'not-allowed' : 'pointer',
          opacity: isExecuting ? 0.6 : 1,
          fontWeight: 'bold',
        }}
      >
        {isExecuting ? 'Running...' : 'Run'}
      </button>

      <button
        onClick={onSave}
        disabled={isSaving}
        style={{
          padding: '8px 16px',
          backgroundColor: '#2d2d2d',
          color: 'white',
          border: '1px solid #555',
          borderRadius: '4px',
          cursor: isSaving ? 'not-allowed' : 'pointer',
          opacity: isSaving ? 0.6 : 1,
        }}
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>

      {lastSavedAt && (
        <div style={{ fontSize: '12px', color: '#888', marginLeft: 'auto' }}>
          Last saved: {formatLastSaved(lastSavedAt)}
        </div>
      )}

      <div style={{ fontSize: '12px', color: '#888' }}>
        {navigator.platform.includes('Mac') ? 'Cmd+S' : 'Ctrl+S'} to save, {navigator.platform.includes('Mac') ? 'Cmd+Enter' : 'Ctrl+Enter'} to run
      </div>
    </div>
  );
}; 