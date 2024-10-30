
# svelte-toast-messages

A lightweight and flexible toast notification library for Svelte, featuring multiple toast types, positioning options, and promise support.

## Instalation

  ```
   npm install svelte-toast-messages
   ```

## Basic Setup 

Add the ToastList component to your app's root (typically App.svelte):

```
<script>
  import { ToastList } from 'svelte-toast-messages';
</script>

<!-- Your app content -->

<ToastList />
```
## Usage
Basic Toasts
```
import { toast } from 'svelte-toast-messages';

// Success toast
toast.success('Operation successful!', {
  position: 'top-right',
  duration: 3000
});

// Error toast
toast.error('Something went wrong!', {
  position: 'bottom-right',
  duration: 5000
});
```

## Promise Toast
Perfect for async operations:

```
const myAsyncOperation = async () => {
  try {
    await toast.promise(
      fetchData(), // Your promise
      {
        loading: 'Loading data...',
        success: 'Data loaded successfully!',
        error: 'Error loading data'
      },
      { position: 'bottom-right' }
    );
  } catch (error) {
    console.error(error);
  }
};
```

## Multiple Toasts
The library handles multiple toasts gracefully (maximum 5 at once):
```
function showMultipleToasts() {
  toast.success('First toast', { position: 'top-right' });
  toast.error('Second toast', { position: 'top-left' });
  toast.success('Third toast', { position: 'bottom-right' });
}
```

## Configuration Options

### Position
- `top-right` (default)
- `top-left`
- `bottom-right`
- `bottom-left`

### Duration
- Default: `3000ms` (3 seconds)
- Min: `1000ms` (1 second)
- Max: `10000ms` (10 seconds)
- Loading toasts: `Infinite` (automatically dismissed when promise resolves)

## Toast Options Interface

```
interface ToastOptions {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  duration?: number; // in milliseconds
}
```

## Features

### Core Features
- 🎨 **Multiple Toast Types**
  - Success notifications
  - Error messages
  - Loading states

- 📍 **Flexible Positioning**
  - Four corner positions
  - Customizable placement
  - Automatic stacking

- ⚡ **Promise Integration**
  - Automatic state management
  - Loading → Success/Error transitions
  - Built-in error handling

### Advanced Features
- 🔄 **Queue Management**
  - Maximum 5 toasts at once
  - Automatic oldest toast removal
  - Smart positioning system

- 💨 **Animations**
  - Smooth fade in/out
  - Fly animation effects
  - Configurable durations

- 🎯 **Developer Experience**
  - Full TypeScript support
  - Type definitions included

  ## Examples
  ### Form submission example 

  ```
    async function handleFormSubmit() {
    const submitForm = new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 2000);
    });

  try {
    await toast.promise(
      submitForm,
      {
        loading: 'Submitting form...',
        success: 'Form submitted!',
        error: 'Error submitting form'
      },
      { position: 'bottom-right' }
    );
  } catch (error) {
    console.error(error);
  }

## Support & Contributing

### Browser Support
✅ Works in all modern browsers that support ES6:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contributing
We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Feel free to check the [issues page](https://github.com/willianctti/svelte-toast-messages/issues) if you want to contribute.
