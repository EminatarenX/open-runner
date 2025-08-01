import { useState, useEffect, useCallback, useRef } from 'react';
import { ManageCodeUseCase } from '../../application/use-cases/manage-code.use-case';

export const useAutoSave = (
  manageCodeUseCase: ManageCodeUseCase,
  autoSaveDelay: number = 2000
) => {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveCode = useCallback(
    async (code: string) => {
      setIsSaving(true);
      try {
        await manageCodeUseCase.saveCode(code);
        setLastSavedAt(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    },
    [manageCodeUseCase]
  );

  const scheduleAutoSave = useCallback(
    (code: string) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Schedule new auto-save
      timeoutRef.current = setTimeout(() => {
        saveCode(code);
      }, autoSaveDelay);
    },
    [saveCode, autoSaveDelay]
  );

  const loadCode = useCallback(async () => {
    try {
      return await manageCodeUseCase.loadCode();
    } catch (error) {
      console.error('Failed to load code:', error);
      return '';
    }
  }, [manageCodeUseCase]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    scheduleAutoSave,
    saveCode,
    loadCode,
    lastSavedAt,
    isSaving,
  };
}; 