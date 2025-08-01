import { CodeExecutionPort } from '../../application/ports/code-execution.port';
import { CodeExecutionResult } from '../../shared/types';

export class SafeCodeExecutionAdapter implements CodeExecutionPort {
  private readonly unsafePatterns = [
    /eval\s*\(/,
    /Function\s*\(/,
    /setTimeout\s*\(/,
    /setInterval\s*\(/,
    /document\./,
    /window\./,
    /localStorage\./,
    /sessionStorage\./,
    /indexedDB\./,
    /Worker\s*\(/,
    /import\s*\(/,
    /require\s*\(/,
  ];

  isSafe(code: string): boolean {
    return !this.unsafePatterns.some(pattern => pattern.test(code));
  }

  async execute(code: string): Promise<CodeExecutionResult> {
    console.log('🔒 SafeCodeExecutionAdapter: Starting execution');
    const startTime = performance.now();
    
    try {
      // Create a safe execution environment
      console.log('🔒 SafeCodeExecutionAdapter: Creating sandbox');
      const result = await this.executeInSandbox(code);
      console.log('🔒 SafeCodeExecutionAdapter: Sandbox execution completed, output length:', result.length);
      
      const executionTime = performance.now() - startTime;
      
      return {
        output: result,
        executionTime,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('🔒 SafeCodeExecutionAdapter: Execution failed:', error);
      const executionTime = performance.now() - startTime;
      
      return {
        output: '',
        error: error instanceof Error ? error.message : String(error),
        executionTime,
        timestamp: new Date(),
      };
    }
  }

  private async executeInSandbox(code: string): Promise<string> {
    console.log('🔒 Creating sandbox environment');
    
    // Create a safe console object that captures output
    let output = '';
    
    const safeConsole = {
      log: (...args: unknown[]) => {
        const message = args.map(arg => this.stringify(arg)).join(' ');
        console.log('📝 Console.log called:', message);
        output += message + '\n';
      },
      error: (...args: unknown[]) => {
        const message = 'ERROR: ' + args.map(arg => this.stringify(arg)).join(' ');
        console.log('❌ Console.error called:', message);
        output += message + '\n';
      },
      warn: (...args: unknown[]) => {
        const message = 'WARN: ' + args.map(arg => this.stringify(arg)).join(' ');
        console.log('⚠️ Console.warn called:', message);
        output += message + '\n';
      },
      info: (...args: unknown[]) => {
        const message = args.map(arg => this.stringify(arg)).join(' ');
        console.log('ℹ️ Console.info called:', message);
        output += message + '\n';
      },
      debug: (...args: unknown[]) => {
        const message = 'DEBUG: ' + args.map(arg => this.stringify(arg)).join(' ');
        console.log('🐛 Console.debug called:', message);
        output += message + '\n';
      },
    };

    // Create a safe fetch function using global fetch
    const safeFetch = async (url: string, options?: any) => {
      try {
        // Use the global fetch function
        const response = await (globalThis as any).fetch(url, options);
        return response;
      } catch (error) {
        throw new Error(`Fetch error: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    try {
      console.log('🔒 Executing code in sandbox');
      
      // Parse the code to find function calls and expressions
      const codeLines = code.trim().split('\n');
      const processedLines: string[] = [];
      const expressionsToCapture: string[] = [];
      
      for (const line of codeLines) {
        const trimmedLine = line.trim();
        
        // Skip empty lines, comments, and declarations
        if (!trimmedLine || 
            trimmedLine.startsWith('//') || 
            trimmedLine.startsWith('/*') || 
            trimmedLine.startsWith('*') ||
            trimmedLine.includes('function') ||
            trimmedLine.includes('const') ||
            trimmedLine.includes('let') ||
            trimmedLine.includes('var') ||
            trimmedLine.includes('if') ||
            trimmedLine.includes('for') ||
            trimmedLine.includes('while') ||
            trimmedLine.includes('return') ||
            trimmedLine.includes('=')) {
          processedLines.push(line);
          continue;
        }
        
        // If it looks like a function call or expression, capture it
        if (trimmedLine.includes('(') || 
            /^[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/.test(trimmedLine) ||
            /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(trimmedLine)) {
          expressionsToCapture.push(trimmedLine);
          processedLines.push(`__captureResult(${trimmedLine})`);
        } else {
          processedLines.push(line);
        }
      }
      
      // Create the wrapped code with capture functionality
      const wrappedCode = `
        (async function(console, fetch) {
          "use strict";
          
          // Function to capture results
          function __captureResult(expr) {
            const result = expr;
            if (result !== undefined) {
              console.log('__AUTO_CAPTURE__', JSON.stringify(result));
            }
            return result;
          }
          
          ${processedLines.join('\n')}
        });
      `;
      
      console.log('🔒 Code to execute:', wrappedCode);
      
      // Execute the code with the console and fetch objects passed directly
      const executeFunction = eval(wrappedCode);
      await executeFunction(safeConsole, safeFetch);
      
      // Process the output to extract captured results
      const lines = output.split('\n');
      const finalOutput: string[] = [];
      
      for (const line of lines) {
        if (line.includes('__AUTO_CAPTURE__')) {
          // Extract the captured result
          const match = line.match(/__AUTO_CAPTURE__\s*(.+)/);
          if (match) {
            try {
              const capturedValue = JSON.parse(match[1]);
              finalOutput.push(this.stringify(capturedValue));
            } catch {
              // If it's not valid JSON, just show the raw value
              finalOutput.push(match[1]);
            }
          }
        } else if (line.trim() && !line.includes('📝 Console.log called:')) {
          // Keep regular console.log output
          finalOutput.push(line);
        }
      }
      
      // Add a small delay to ensure all console.log calls are captured
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('🔒 Code executed, output:', finalOutput.join('\n'));
      return finalOutput.join('\n');
      
    } catch (error) {
      console.error('🔒 Sandbox execution error:', error);
      output += `\nERROR: ${error instanceof Error ? error.message : String(error)}\n`;
      return output;
    }
  }

  private stringify(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';

    // Handle objects and arrays
    if (typeof value === 'object') {
      try {
        const jsonString = JSON.stringify(value, null, 2);
        // Siempre poner el bloque en líneas separadas
        return `\n\`\`\`json\n${jsonString}\n\`\`\`\n`;
      } catch {
        return '[Object]';
      }
    }

    // Handle strings that look like JSON
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        const jsonString = JSON.stringify(parsed, null, 2);
        return `\n\`\`\`json\n${jsonString}\n\`\`\`\n`;
      } catch {
        // Not valid JSON, return as regular string
        return String(value);
      }
    }

    return String(value);
  }
} 