import { CodeSnippet } from '../../shared/types';

export interface CodePersistencePort {
  save(code: string): Promise<void>;
  load(): Promise<string>;
  saveSnippet(snippet: CodeSnippet): Promise<void>;
  loadSnippets(): Promise<CodeSnippet[]>;
} 