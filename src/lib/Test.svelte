<script lang="ts">
    import { toast } from './toastStore';
  
    function handleSimpleToast() {
        toast.success('DEU BOA', {
            position: 'bottom-right',
            duration: 5000
        });
    }
  
    function handleErrorToast() {
        toast.error('Algo deu errado!', {
            position: 'top-right',
            duration: 5000
        });
    }
  
    async function handlePromiseToast() {
      const fakePromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve('OK') : reject('Error');
        }, 2000);
      });
  
      toast.promise(fakePromise, {
        loading: 'Carregando...',
        success: 'Dados carregados com sucesso!',
        error: 'Erro ao carregar dados'
      });
    }
  </script>
  
  <div class="buttons">
    <button on:click={handleSimpleToast}>Mostrar Sucesso</button>
    <button on:click={handleErrorToast}>Mostrar Erro</button>
    <button on:click={handlePromiseToast}>Testar Promise</button>
  </div>
  
  <style>
    .buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin: 2rem;
    }
  
    button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      background: #4B5563;
      color: white;
      cursor: pointer;
    }
  
    button:hover {
      background: #374151;
    }
  </style>