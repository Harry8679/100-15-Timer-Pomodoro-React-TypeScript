import { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useSettings } from '../hooks/useSettings';
import { useNotifications } from '../hooks/useNotifications';
import { useSound } from '../hooks/useSound';
import { getSessionDuration, getSessionLabel } from '../utils/helpers';
import { Timer } from './Timer';
import { Controls } from './Controls';
import { SessionSelector } from './SessionSelector';
import { Settings } from './Settings';
import { Statistics } from './Statistics';

export const PomodoroTimer = () => {
  const { settings, updateSettings } = useSettings();
  const { state, sessions, start, pause, resume, reset, switchSession, completeSession } =
    useTimer(settings);

  const { sendNotification } = useNotifications(settings.notificationsEnabled);
  const { playSound } = useSound(settings.soundEnabled, settings.volume);

  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Gérer la fin d'une session
  useEffect(() => {
    if (state.isRunning && state.timeLeft === 0) {
      completeSession();
      playSound();

      const message =
        state.sessionType === 'pomodoro'
          ? 'Bravo ! Temps de faire une pause 🎉'
          : 'Pause terminée ! Retour au travail 💪';

      sendNotification('Pomodoro Timer', message);
    }
  }, [state.isRunning, state.timeLeft, state.sessionType, completeSession, playSound, sendNotification]);

  const handleSwitchSession = (type: typeof state.sessionType) => {
    if (!state.isRunning) {
      switchSession(type);
    }
  };

  const stats = {
    today: {
      pomodoros: 0,
      totalTime: 0,
      breaks: 0,
    },
    total: {
      pomodoros: 0,
      totalTime: 0,
    },
    sessions: sessions.map(s => ({
      ...s,
      startTime: new Date(s.startTime),
      endTime: new Date(s.endTime),
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            ⏰ Timer Pomodoro
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 15/100 • Multiple useEffect & Cleanup
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Gestion avancée des effets et du nettoyage
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setShowStats(true)}
            className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors shadow-lg"
          >
            📊 Stats
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors shadow-lg"
          >
            ⚙️ Paramètres
          </button>
        </div>

        {/* Main card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Session type */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {getSessionLabel(state.sessionType)}
            </h2>
          </div>

          {/* Session selector */}
          <SessionSelector
            currentSession={state.sessionType}
            onSelectSession={handleSwitchSession}
            disabled={state.isRunning}
            completedPomodoros={state.completedPomodoros}
          />

          {/* Timer */}
          <div className="mb-8">
            <Timer
              sessionType={state.sessionType}
              timeLeft={state.timeLeft}
              totalTime={getSessionDuration(state.sessionType, settings)}
            />
          </div>

          {/* Controls */}
          <Controls
            isRunning={state.isRunning}
            isPaused={state.isPaused}
            onStart={start}
            onPause={pause}
            onResume={resume}
            onReset={reset}
          />
        </div>
      </div>

      {/* Modals */}
      {showSettings && (
        <Settings
          settings={settings}
          onSave={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showStats && (
        <Statistics stats={stats} onClose={() => setShowStats(false)} />
      )}
    </div>
  );
};