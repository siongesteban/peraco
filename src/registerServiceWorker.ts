export const registerServiceWorker = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.error('Service worker was not found.');
    return;
  }

  const { Workbox } = await import('workbox-window');

  const workbox = new Workbox('/service-worker.js');

  try {
    const registration = await workbox.register();

    console.log('Service worker has been registered', registration);
  } catch (e) {
    console.error('Service worker registration failed', e);
  }
};
