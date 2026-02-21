import { useState } from 'react';
import type { SettingsProps } from '../types';

export const Settings = ({ settings, onSave, onClose }: SettingsProps) => {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              ⚙️ Paramètres
            </h2>
            <button
              type="button"
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
            {/* Timer durations */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Durées (minutes)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Pomodoro
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.pomodoro}
                    onChange={(e) =>
                      setFormData({ ...formData, pomodoro: parseInt(e.target.value) || 25 })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Pause courte
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.shortBreak}
                    onChange={(e) =>
                      setFormData({ ...formData, shortBreak: parseInt(e.target.value) || 5 })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Pause longue
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.longBreak}
                    onChange={(e) =>
                      setFormData({ ...formData, longBreak: parseInt(e.target.value) || 15 })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Long break interval */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Pause longue après (pomodoros)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.longBreakInterval}
                onChange={(e) =>
                  setFormData({ ...formData, longBreakInterval: parseInt(e.target.value) || 4 })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none"
              />
            </div>

            {/* Auto-start options */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Démarrage automatique
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoStartBreaks}
                    onChange={(e) =>
                      setFormData({ ...formData, autoStartBreaks: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Démarrer les pauses automatiquement
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoStartPomodoros}
                    onChange={(e) =>
                      setFormData({ ...formData, autoStartPomodoros: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Démarrer les pomodoros automatiquement
                  </span>
                </label>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Notifications
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notificationsEnabled}
                    onChange={(e) =>
                      setFormData({ ...formData, notificationsEnabled: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Notifications navigateur
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.soundEnabled}
                    onChange={(e) =>
                      setFormData({ ...formData, soundEnabled: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Sons de notification
                  </span>
                </label>
              </div>

              {/* Volume */}
              {formData.soundEnabled && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Volume : {Math.round(formData.volume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formData.volume}
                    onChange={(e) =>
                      setFormData({ ...formData, volume: parseFloat(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-semibold transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};