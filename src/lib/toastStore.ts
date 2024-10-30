import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'loading';

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export interface ToastOptions {
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const VALID_POSITIONS = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;
const DEFAULT_DURATION = 3000;
const MIN_DURATION = 1000;
const MAX_DURATION = 10000;

function validateOptions(options?: ToastOptions): ToastOptions {
  if (!options) return {};
  
  return {
    position: VALID_POSITIONS.includes(options.position as any) 
      ? options.position 
      : 'top-right',
    duration: options.duration 
      ? Math.min(Math.max(options.duration, MIN_DURATION), MAX_DURATION)
      : DEFAULT_DURATION
  };
}

const toasts = writable<ToastProps[]>([]);
const MAX_TOASTS = 5;


function createToast(message: string, type: ToastType, options?: ToastOptions) {
  const validatedOptions = validateOptions(options);
  const id = Math.random().toString(36).substr(2, 9);
  const toast = { 
    id, 
    message: String(message),
    type, 
    ...validatedOptions
  };
  
  toasts.update((all) => {
    if (all.length >= MAX_TOASTS) {
      return [...all.slice(-(MAX_TOASTS - 1)), toast];
    }
    return [...all, toast];
  });
  
  if (toast.duration && type !== 'loading') {
    setTimeout(() => {
      dismissToast(id);
    }, toast.duration);
  }
  
  return id;
}

function dismissToast(id: string) {
  toasts.update((all) => all.filter((t) => t.id !== id));
}

const toast = {
  success: (message: string, options?: ToastOptions) => 
    createToast(message, 'success', options),
  
  error: (message: string, options?: ToastOptions) => 
    createToast(message, 'error', options),
  
  loading: (message: string, options?: ToastOptions) => 
    createToast(message, 'loading', { 
      ...options, 
      duration: options?.duration || 0 
    }),
  promise: async <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ) => {
    if (!promise || typeof promise.then !== 'function') {
      throw new Error('First argument must be a Promise');
    }

    const validatedMessages = {
      loading: String(messages?.loading || 'Loading...'),
      success: String(messages?.success || 'Success!'),
      error: String(messages?.error || 'Error!')
    };

    const toastId = toast.loading(validatedMessages.loading, options);
    
    try {
      const result = await Promise.race([
        promise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Promise timeout')), 30000)
        )
      ]);
      
      dismissToast(toastId);
      await new Promise(resolve => setTimeout(resolve, 300));
      toast.success(validatedMessages.success, options);
      return result;
    } catch (error) {
      dismissToast(toastId);
      await new Promise(resolve => setTimeout(resolve, 300));
      toast.error(validatedMessages.error, options);
      throw error;
    }
  }
};

export { toast, toasts };