import { CodePersistencePort } from '../ports/code-persistence.port';
import { CodeSnippet } from '../../shared/types';

export class ManageCodeUseCase {
  constructor(private codePersistencePort: CodePersistencePort) {}

  async saveCode(code: string): Promise<void> {
    await this.codePersistencePort.save(code);
  }

  async loadCode(): Promise<string> {
    return await this.codePersistencePort.load();
  }

  async saveSnippet(snippet: CodeSnippet): Promise<void> {
    await this.codePersistencePort.saveSnippet(snippet);
  }

  async loadSnippets(): Promise<CodeSnippet[]> {
    return await this.codePersistencePort.loadSnippets();
  }
} 