import { getSessionLabel } from '../utils/helpers';
import type { SessionType } from '../types';

interface SessionSelectorProps {
  currentSession: SessionType;
  onSelectSession: (type: SessionType) => void;
  disabled: boolean;
  completedPomodoros: number;
}

export const SessionSelector = ({
  currentSession,
  onSelectSession,
  disabled,
  completedPomodoros,
}: SessionSelectorProps) => {
  const sessions: SessionType[] = ['pomodoro', 'shortBreak', 'longBreak'];

  const getSessionColor = (type: SessionType) => {
    const colors = {
      pomodoro: 'from-red-500 to-pink-600',
      shortBreak: 'from-green-500 to-teal-600',
      longBreak: 'from-blue-500 to-indigo-600',
    };
    return colors[type];
  };

  return (
    <div className="flex gap-3 mb-8">
      {sessions.map((session) => (
        <button
          key={session}
          onClick={() => onSelectSession(session)}
          disabled={disabled}
          className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
            currentSession === session
              ? `bg-gradient-to-r ${getSessionColor(session)} text-white shadow-lg scale-105`
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
        >
          {getSessionLabel(session)}
        </button>
      ))}
      
      {completedPomodoros > 0 && (
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold shadow-lg">
          🍅 {completedPomodoros}
        </div>
      )}
    </div>
  );
};