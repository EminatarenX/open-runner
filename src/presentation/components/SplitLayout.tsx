import React, { useEffect, useRef } from 'react';
import Split from 'split.js';

interface SplitLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  leftPanel,
  rightPanel,
  minSize = 200,
  maxSize = 800,
  defaultSize = 50,
}) => {
  const splitRef = useRef<HTMLDivElement>(null);
  const splitInstanceRef = useRef<Split.Instance | null>(null);

  useEffect(() => {
    if (splitRef.current) {
      const split = Split(['.split-left', '.split-right'], {
        sizes: [defaultSize, 100 - defaultSize],
        minSize: [minSize, minSize],
        maxSize: [maxSize, maxSize],
        gutterSize: 4,
        snapOffset: 0,
        dragInterval: 1,
        cursor: 'col-resize',
        gutter: (index, direction) => {
          const gutter = document.createElement('div');
          gutter.className = `gutter gutter-${direction}`;
          gutter.style.cssText = `
            background-color: #333;
            cursor: col-resize;
            position: relative;
          `;
          return gutter;
        },
      });

      splitInstanceRef.current = split;

      return () => {
        if (splitInstanceRef.current) {
          splitInstanceRef.current.destroy();
        }
      };
    }
  }, [defaultSize, minSize, maxSize]);

  return (
    <div ref={splitRef} style={{ height: '100vh', display: 'flex' }}>
      <div className="split-left" style={{ 
        height: '100%',
        backgroundColor: '#1e1e1e',
        overflow: 'hidden',
      }}>
        {leftPanel}
      </div>
      <div className="split-right" style={{ 
        height: '100%',
        backgroundColor: '#252526',
        overflow: 'hidden',
      }}>
        {rightPanel}
      </div>
    </div>
  );
}; 