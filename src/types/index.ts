// Types pour le timer Pomodoro

export type SessionType = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  pomodoro: number; // en minutes
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number; // après combien de pomodoros
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  volume: number; // 0-1
}

export interface TimerState {
  sessionType: SessionType;
  timeLeft: number; // en secondes
  isRunning: boolean;
  isPaused: boolean;
  completedPomodoros: number;
}

export interface Session {
  type: SessionType;
  startTime: Date;
  endTime: Date;
  completed: boolean;
}

export interface Statistics {
  today: {
    pomodoros: number;
    totalTime: number; // en minutes
    breaks: number;
  };
  total: {
    pomodoros: number;
    totalTime: number;
  };
  sessions: Session[];
}

export interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export interface SettingsProps {
  settings: TimerSettings;
  onSave: (settings: TimerSettings) => void;
  onClose: () => void;
}

export interface StatisticsProps {
  stats: Statistics;
  onClose: () => void;
}