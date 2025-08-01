import { CodeExecutionResult } from '../../shared/types';

export interface CodeExecutionPort {
  execute(code: string): Promise<CodeExecutionResult>;
  isSafe(code: string): boolean;
} 