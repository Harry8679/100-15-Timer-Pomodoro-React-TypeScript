import { useCallback } from 'react';
import { playNotificationSound } from '../utils/helpers';

export const useSound = (enabled: boolean, volume: number) => {
  const playSound = useCallback(() => {
    if (enabled) {
      playNotificationSound(volume);
    }
  }, [enabled, volume]);

  return { playSound };
};