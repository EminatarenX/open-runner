import { useState } from 'react';
import './App.css';
import { SplitLayout } from './presentation/components/SplitLayout';
import { CodeEditor } from './presentation/components/CodeEditor';
import { OutputPanel } from './presentation/components/OutputPanel';
import { Toolbar } from './presentation/components/Toolbar';
import { useCodeExecution } from './presentation/hooks/use-code-execution';
import { useAutoSave } from './presentation/hooks/use-auto-save';
import { DEFAULT_CODE } from './shared/constants';
import { ExecuteCodeUseCase } from './application/use-cases/execute-code.use-case';
import { ManageCodeUseCase } from './application/use-cases/manage-code.use-case';
import { SafeCodeExecutionAdapter } from './infrastructure/adapters/safe-code-execution.adapter';
import { LocalStoragePersistenceAdapter } from './infrastructure/adapters/local-storage-persistence.adapter';

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  
  // Initialize use cases
  const codeExecutionAdapter = new SafeCodeExecutionAdapter();
  const persistenceAdapter = new LocalStoragePersistenceAdapter();
  const executeCodeUseCase = new ExecuteCodeUseCase(codeExecutionAdapter, persistenceAdapter);
  const manageCodeUseCase = new ManageCodeUseCase(persistenceAdapter);
  
  const { executeCode, isExecuting, lastResult, error } = useCodeExecution(executeCodeUseCase);
  const { isSaving, lastSavedAt, scheduleAutoSave } = useAutoSave(manageCodeUseCase);

  const handleRunCode = () => {
    executeCode(code);
  };

  const handleSaveCode = () => {
    scheduleAutoSave(code);
  };

  return (
    <div className="App">
      <Toolbar 
        onRun={handleRunCode}
        onSave={handleSaveCode}
        isExecuting={isExecuting}
        isSaving={isSaving}
        lastSavedAt={lastSavedAt}
      />
      <SplitLayout
        leftPanel={
          <CodeEditor
            value={code}
            onChange={setCode}
            config={{
              theme: 'vs-dark',
              fontSize: 14,
              vimMode: false,
              autoSave: true,
              autoSaveDelay: 2000,
            }}
          />
        }
        rightPanel={
          <OutputPanel 
            result={lastResult}
            isExecuting={isExecuting}
            error={error}
          />
        }
      />
    </div>
  );
}

export default App; 