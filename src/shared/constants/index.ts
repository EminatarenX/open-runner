export const DEFAULT_EDITOR_CONFIG = {
  theme: 'vs-dark' as const,
  fontSize: 14,
  vimMode: true,
  autoSave: true,
  autoSaveDelay: 2000, // 2 seconds
};

export const DEFAULT_CODE = `
// Write your JavaScript code here and press Run or Ctrl+S to execute

console.log('Hello, World!');

// You can also use async/await
async function example() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  console.log('API Response:', data);
}

// Uncomment to run the example
// example();
`;

export const MONACO_EDITOR_OPTIONS = {
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  wordWrap: 'on' as const,
  lineNumbers: 'on' as const,
  folding: true,
  fontSize: DEFAULT_EDITOR_CONFIG.fontSize,
  theme: DEFAULT_EDITOR_CONFIG.theme,
}; 