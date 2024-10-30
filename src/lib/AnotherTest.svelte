<script lang="ts">
    import { toast } from './toastStore';
  
    async function handleFormSubmit() {
      const fakeApi = new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 2000);
      });
  
      try {
        await toast.promise(
          fakeApi,
          {
            loading: 'Enviando formulário...',
            success: 'Formulário enviado!',
            error: 'Erro ao enviar formulário'
          },
          { position: 'bottom-right' }
        );
      } catch (error) {
        console.error(error);
      }
    }
  
    function showMultipleToasts() {
      toast.success('Primeiro toast', { position: 'top-right' });
      toast.error('Segundo toast', { position: 'top-left' });
      toast.success('Terceiro toast', { position: 'bottom-right' });
      toast.error('Quarto toast', { position: 'bottom-left' });
      toast.success('Quinto toast', { position: 'top-right' });
      // Este sexto toast substituirá o mais antigo devido ao limite
      toast.error('Sexto toast', { position: 'top-left' });
    }
  </script>
  
  <div class="container">
    <button on:click={handleFormSubmit}>Testar Form</button>
    <button on:click={showMultipleToasts}>Testar Múltiplos</button>
  </div>