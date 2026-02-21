import { useEffect, useCallback } from 'react';

export const useNotifications = (enabled: boolean) => {
  useEffect(() => {
    if (enabled && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [enabled]);

  const sendNotification = useCallback(
    (title: string, body: string) => {
      if (!enabled || !('Notification' in window)) return;

      if (Notification.permission === 'granted') {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
        });
      }
    },
    [enabled]
  );

  return { sendNotification };
};