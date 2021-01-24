export const registerServiceWorker = (): void => {
  console.log('env', process.env.NODE_ENV);
  const production = !['development', 'test'].includes(process.env.NODE_ENV);

  if (!production) {
    return;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};
