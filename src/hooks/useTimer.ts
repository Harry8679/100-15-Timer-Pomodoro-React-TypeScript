import { useState, useEffect, useCallback, useRef } from 'react';
import { getSessionDuration, getNextSessionType } from '../utils/helpers';
import type { SessionType, TimerSettings, TimerState, Session } from '../types';

const STORAGE_KEY_STATE = 'pomodoro-state';
const STORAGE_KEY_STATS = 'pomodoro-stats';

export const useTimer = (settings: TimerSettings) => {
  const [state, setState] = useState<TimerState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          isRunning: false, // Ne pas auto-démarrer
        };
      }
    } catch { /* empty */ }
    return {
      sessionType: 'pomodoro' as SessionType,
      timeLeft: settings.pomodoro * 60,
      isRunning: false,
      isPaused: false,
      completedPomodoros: 0,
    };
  });

  const [sessions, setSessions] = useState<Session[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const intervalRef = useRef<number | null>(null);
  const sessionStartRef = useRef<Date | null>(null);

  // Sauvegarder l'état
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
  }, [state]);

  // Sauvegarder les sessions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(sessions));
  }, [sessions]);

  // Cleanup du timer
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Gérer le timer
  useEffect(() => {
    if (state.isRunning && state.timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.timeLeft]);

  // Mettre à jour le titre de la page
  useEffect(() => {
    if (state.isRunning) {
      const mins = Math.floor(state.timeLeft / 60);
      const secs = state.timeLeft % 60;
      document.title = `${mins}:${secs.toString().padStart(2, '0')} - Pomodoro Timer`;
    } else {
      document.title = 'Pomodoro Timer';
    }

    return () => {
      document.title = 'Pomodoro Timer';
    };
  }, [state.isRunning, state.timeLeft]);

  const start = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
    sessionStartRef.current = new Date();
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false, isPaused: true }));
  }, []);

  const resume = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      timeLeft: getSessionDuration(prev.sessionType, settings),
      isRunning: false,
      isPaused: false,
    }));
    sessionStartRef.current = null;
  }, [settings]);

  const switchSession = useCallback(
    (type: SessionType) => {
      setState(prev => ({
        ...prev,
        sessionType: type,
        timeLeft: getSessionDuration(type, settings),
        isRunning: false,
        isPaused: false,
      }));
      sessionStartRef.current = null;
    },
    [settings]
  );

  const completeSession = useCallback(() => {
    if (sessionStartRef.current) {
      const session: Session = {
        type: state.sessionType,
        startTime: sessionStartRef.current,
        endTime: new Date(),
        completed: true,
      };
      setSessions(prev => [session, ...prev]);
    }

    const newCompletedPomodoros =
      state.sessionType === 'pomodoro'
        ? state.completedPomodoros + 1
        : state.completedPomodoros;

    const nextType = getNextSessionType(
      state.sessionType,
      newCompletedPomodoros,
      settings.longBreakInterval
    );

    const shouldAutoStart =
      (nextType === 'pomodoro' && settings.autoStartPomodoros) ||
      (nextType !== 'pomodoro' && settings.autoStartBreaks);

    setState({
      sessionType: nextType,
      timeLeft: getSessionDuration(nextType, settings),
      isRunning: shouldAutoStart,
      isPaused: false,
      completedPomodoros: newCompletedPomodoros,
    });

    sessionStartRef.current = shouldAutoStart ? new Date() : null;
  }, [state, settings]);

  return {
    state,
    sessions,
    start,
    pause,
    resume,
    reset,
    switchSession,
    completeSession,
  };
};