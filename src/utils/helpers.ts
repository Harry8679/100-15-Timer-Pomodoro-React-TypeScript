import type { SessionType, TimerSettings } from '../types';

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getSessionLabel = (type: SessionType): string => {
  const labels: Record<SessionType, string> = {
    pomodoro: 'Pomodoro',
    shortBreak: 'Pause courte',
    longBreak: 'Pause longue',
  };
  return labels[type];
};

export const getSessionColor = (type: SessionType): string => {
  const colors: Record<SessionType, string> = {
    pomodoro: 'from-red-500 to-pink-600',
    shortBreak: 'from-green-500 to-teal-600',
    longBreak: 'from-blue-500 to-indigo-600',
  };
  return colors[type];
};

export const getSessionDuration = (
  type: SessionType,
  settings: TimerSettings
): number => {
  const durations: Record<SessionType, number> = {
    pomodoro: settings.pomodoro * 60,
    shortBreak: settings.shortBreak * 60,
    longBreak: settings.longBreak * 60,
  };
  return durations[type];
};

export const shouldTakeLongBreak = (
  completedPomodoros: number,
  longBreakInterval: number
): boolean => {
  return completedPomodoros > 0 && completedPomodoros % longBreakInterval === 0;
};

export const getNextSessionType = (
  currentType: SessionType,
  completedPomodoros: number,
  longBreakInterval: number
): SessionType => {
  if (currentType === 'pomodoro') {
    return shouldTakeLongBreak(completedPomodoros, longBreakInterval)
      ? 'longBreak'
      : 'shortBreak';
  }
  return 'pomodoro';
};

export const getTodayStart = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const playNotificationSound = (volume: number = 0.5): void => {
  // Créer un son simple avec Web Audio API
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  
  if (!AudioContextClass) {
    console.warn('Web Audio API not supported');
    return;
  }

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  gainNode.gain.value = volume;

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};