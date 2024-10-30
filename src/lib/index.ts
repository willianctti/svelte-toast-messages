import ToastList from './ToastList.svelte';
import { toast, toasts } from './toastStore';
import type { ToastType, ToastOptions, ToastProps } from './toastStore';

// Necessário para o Svelte reconhecer o componente como um módulo
const component = ToastList;

export {
    toast,
    toasts,
    ToastList,
    component
};

export type {
    ToastType,
    ToastOptions,
    ToastProps
};