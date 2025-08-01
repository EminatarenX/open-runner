import { CodeExecutionPort } from '../ports/code-execution.port';
import { CodePersistencePort } from '../ports/code-persistence.port';
import { CodeExecutionResult } from '../../shared/types';

export class ExecuteCodeUseCase {
  constructor(
    private codeExecutionPort: CodeExecutionPort,
    private codePersistencePort: CodePersistencePort
  ) {}

  async execute(code: string): Promise<CodeExecutionResult> {
    // Validate code safety
    if (!this.codeExecutionPort.isSafe(code)) {
      throw new Error('Code contains potentially unsafe operations');
    }

    // Execute the code
    const result = await this.codeExecutionPort.execute(code);

    // Auto-save the code after successful execution
    try {
      await this.codePersistencePort.save(code);
    } catch (error) {
      console.warn('Failed to auto-save code:', error);
    }

    return result;
  }
} 