import { SafeCodeExecutionAdapter } from './adapters/safe-code-execution.adapter';
import { LocalStoragePersistenceAdapter } from './adapters/local-storage-persistence.adapter';
import { ExecuteCodeUseCase } from '../application/use-cases/execute-code.use-case';
import { ManageCodeUseCase } from '../application/use-cases/manage-code.use-case';

// Dependency Injection Container
export class Container {
  private static instance: Container;
  private dependencies: Map<string, any> = new Map();

  private constructor() {
    this.initializeDependencies();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private initializeDependencies() {
    // Infrastructure Layer
    const codeExecutionAdapter = new SafeCodeExecutionAdapter();
    const codePersistenceAdapter = new LocalStoragePersistenceAdapter();

    // Application Layer
    const executeCodeUseCase = new ExecuteCodeUseCase(
      codeExecutionAdapter,
      codePersistenceAdapter
    );
    const manageCodeUseCase = new ManageCodeUseCase(codePersistenceAdapter);

    // Register dependencies
    this.dependencies.set('codeExecutionAdapter', codeExecutionAdapter);
    this.dependencies.set('codePersistenceAdapter', codePersistenceAdapter);
    this.dependencies.set('executeCodeUseCase', executeCodeUseCase);
    this.dependencies.set('manageCodeUseCase', manageCodeUseCase);
  }

  get<T>(key: string): T {
    const dependency = this.dependencies.get(key);
    if (!dependency) {
      throw new Error(`Dependency not found: ${key}`);
    }
    return dependency as T;
  }

  // Convenience methods for common dependencies
  getExecuteCodeUseCase(): ExecuteCodeUseCase {
    return this.get<ExecuteCodeUseCase>('executeCodeUseCase');
  }

  getManageCodeUseCase(): ManageCodeUseCase {
    return this.get<ManageCodeUseCase>('manageCodeUseCase');
  }
} 