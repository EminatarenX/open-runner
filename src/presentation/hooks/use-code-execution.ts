import { useState, useCallback } from 'react';
import { ExecuteCodeUseCase } from '../../application/use-cases/execute-code.use-case';
import { CodeExecutionResult } from '../../shared/types';

export const useCodeExecution = (executeCodeUseCase: ExecuteCodeUseCase) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResult, setLastResult] = useState<CodeExecutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executeCode = useCallback(
    async (code: string) => {
      console.log('🚀 Starting code execution:', { codeLength: code.length });
      setIsExecuting(true);
      setError(null);

      try {
        console.log('📝 Executing code through use case...');
        const result = await executeCodeUseCase.execute(code);
        console.log('✅ Execution completed:', { 
          outputLength: result.output.length,
          executionTime: result.executionTime,
          hasError: !!result.error 
        });
        setLastResult(result);
      } catch (err) {
        console.error('❌ Execution failed:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        setLastResult({
          output: '',
          error: errorMessage,
          executionTime: 0,
          timestamp: new Date(),
        });
      } finally {
        setIsExecuting(false);
        console.log('🏁 Execution finished');
      }
    },
    [executeCodeUseCase]
  );

  const clearResult = useCallback(() => {
    setLastResult(null);
    setError(null);
  }, []);

  return {
    executeCode,
    isExecuting,
    lastResult,
    error,
    clearResult,
  };
}; 