interface ControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export const Controls = ({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset,
}: ControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {!isRunning && !isPaused && (
        <button
          onClick={onStart}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          ▶ Démarrer
        </button>
      )}

      {isRunning && (
        <button
          onClick={onPause}
          className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-xl font-bold text-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          ⏸ Pause
        </button>
      )}

      {isPaused && (
        <button
          onClick={onResume}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          ▶ Reprendre
        </button>
      )}

      {(isRunning || isPaused) && (
        <button
          onClick={onReset}
          className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-bold text-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          ⟳ Reset
        </button>
      )}
    </div>
  );
};