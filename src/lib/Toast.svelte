<script>
    export let message = "This is a toast";
    export let duration = 3000;
    export let position = 'top-right'; // 'top-left', 'bottom-right', 'bottom-left'
    export let color = 'orange'; // Default color
    let show = true;
  
    const positions = {
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;',
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;'
    };
  
    setTimeout(() => show = false, duration);
  </script>
  
  <style>
    .toast {
      position: fixed;
      padding: 1rem;
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      z-index: 1000;
      opacity: 0.9;
      transition: all 0.3s ease;
    }
    .hidden {
      opacity: 0;
      transform: translateY(20px);
    }
  </style>
  
  <div class="toast {show ? '' : 'hidden'}" style="background-color: {color}; {positions[position]}">
    {message}
  </div>
  