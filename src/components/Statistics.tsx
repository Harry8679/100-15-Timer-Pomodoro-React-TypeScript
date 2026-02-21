import { formatDate, isSameDay, getTodayStart } from '../utils/helpers';
import type { StatisticsProps } from '../types';

export const Statistics = ({ stats, onClose }: StatisticsProps) => {
  const todayStart = getTodayStart();
  const todaySessions = stats.sessions.filter(s => isSameDay(s.startTime, todayStart));

  const pomodorosToday = todaySessions.filter(s => s.type === 'pomodoro').length;
  const breaksToday = todaySessions.filter(s => s.type !== 'pomodoro').length;

  const totalMinutesToday = todaySessions.reduce((total, session) => {
    const duration = (session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60;
    return total + duration;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            📊 Statistiques
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Today stats */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Aujourd'hui
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-linear-to-br from-red-500 to-pink-600 rounded-xl p-4 text-white">
                <div className="text-3xl font-bold mb-1">{pomodorosToday}</div>
                <div className="text-sm opacity-90">Pomodoros</div>
              </div>
              <div className="bg-linear-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white">
                <div className="text-3xl font-bold mb-1">{breaksToday}</div>
                <div className="text-sm opacity-90">Pauses</div>
              </div>
              <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white">
                <div className="text-3xl font-bold mb-1">{Math.round(totalMinutesToday)}</div>
                <div className="text-sm opacity-90">Minutes</div>
              </div>
            </div>
          </div>

          {/* Total stats */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Total
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {stats.sessions.filter(s => s.type === 'pomodoro').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Pomodoros totaux
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {Math.round(
                    stats.sessions.reduce((total, session) => {
                      const duration = (session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60;
                      return total + duration;
                    }, 0)
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Minutes totales
                </div>
              </div>
            </div>
          </div>

          {/* Recent sessions */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Sessions récentes
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {stats.sessions.slice(0, 10).map((session, index) => {
                const duration = Math.round(
                  (session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60
                );
                const icon = session.type === 'pomodoro' ? '🍅' : session.type === 'shortBreak' ? '☕' : '🌙';
                
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{icon}</span>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-white">
                          {session.type === 'pomodoro'
                            ? 'Pomodoro'
                            : session.type === 'shortBreak'
                            ? 'Pause courte'
                            : 'Pause longue'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(session.startTime)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {duration} min
                    </div>
                  </div>
                );
              })}
              {stats.sessions.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Aucune session enregistrée
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};