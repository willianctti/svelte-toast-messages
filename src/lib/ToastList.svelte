<script lang="ts">
  import { toasts } from './toastStore';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  const icons = {
    success: '✅',
    error: '❌',
    loading: '🔄'
  };

  function getPositionStyle(position: string) {
    switch (position) {
      case 'top-right':
        return 'top: 1rem; right: 1rem;';
      case 'top-left':
        return 'top: 1rem; left: 1rem;';
      case 'bottom-right':
        return 'bottom: 1rem; right: 1rem;';
      case 'bottom-left':
        return 'bottom: 1rem; left: 1rem;';
      default:
        return 'top: 1rem; right: 1rem;';
    }
  }
</script>

<div class="toast-container">
{#each $toasts as toast (toast.id)}
  <div
    class="toast {toast.type}"
    style={getPositionStyle(toast.position || 'top-right')}
    animate:flip
    in:fly="{{ y: 50, duration: 300 }}"
    out:fade="{{ duration: 300 }}"
  >
    <span class="icon">{icons[toast.type]}</span>
    <span class="message">{toast.message}</span>
  </div>
{/each}
</div>

<style>
  .toast-container {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .toast {
    position: fixed;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 8px;
    background-color: white;
    color: #1f2937;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    min-width: 300px;
    border-left: 4px solid #9ca3af;
  }

  .success {
    border-left-color: #10B981;
  }

  .error {
    border-left-color: #EF4444;
  }

  .loading {
    border-left-color: #6B7280;
  }

  .icon {
    font-size: 1.1rem;
  }

  .message {
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>