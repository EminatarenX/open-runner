import { CodePersistencePort } from '../../application/ports/code-persistence.port';
import { CodeSnippet } from '../../shared/types';

export class LocalStoragePersistenceAdapter implements CodePersistencePort {
  private readonly CURRENT_CODE_KEY = 'runjs_current_code';
  private readonly SNIPPETS_KEY = 'runjs_snippets';

  async save(code: string): Promise<void> {
    try {
      localStorage.setItem(this.CURRENT_CODE_KEY, code);
    } catch (error) {
      console.error('Failed to save code to localStorage:', error);
      throw new Error('Failed to save code');
    }
  }

  async load(): Promise<string> {
    try {
      return localStorage.getItem(this.CURRENT_CODE_KEY) || '';
    } catch (error) {
      console.error('Failed to load code from localStorage:', error);
      return '';
    }
  }

  async saveSnippet(snippet: CodeSnippet): Promise<void> {
    try {
      const snippets = await this.loadSnippets();
      const existingIndex = snippets.findIndex(s => s.id === snippet.id);
      
      if (existingIndex >= 0) {
        snippets[existingIndex] = snippet;
      } else {
        snippets.push(snippet);
      }

      localStorage.setItem(this.SNIPPETS_KEY, JSON.stringify(snippets));
    } catch (error) {
      console.error('Failed to save snippet to localStorage:', error);
      throw new Error('Failed to save snippet');
    }
  }

  async loadSnippets(): Promise<CodeSnippet[]> {
    try {
      const data = localStorage.getItem(this.SNIPPETS_KEY);
      if (!data) return [];
      
      const snippets = JSON.parse(data);
      return snippets.map((snippet: any) => ({
        ...snippet,
        createdAt: new Date(snippet.createdAt),
        updatedAt: new Date(snippet.updatedAt),
        lastExecutedAt: snippet.lastExecutedAt ? new Date(snippet.lastExecutedAt) : undefined,
      }));
    } catch (error) {
      console.error('Failed to load snippets from localStorage:', error);
      return [];
    }
  }
} 