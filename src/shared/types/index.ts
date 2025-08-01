export interface CodeExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
  timestamp: Date;
}

export interface CodeSnippet {
  id: string;
  content: string;
  language: 'javascript';
  createdAt: Date;
  updatedAt: Date;
  lastExecutedAt?: Date;
}

export interface EditorConfig {
  theme: 'vs-dark' | 'vs-light' | 'hc-black';
  fontSize: number;
  vimMode: boolean;
  autoSave: boolean;
  autoSaveDelay: number;
}

export interface AppState {
  currentCode: string;
  executionResult: CodeExecutionResult | null;
  editorConfig: EditorConfig;
  isExecuting: boolean;
  lastSavedAt?: Date;
} 