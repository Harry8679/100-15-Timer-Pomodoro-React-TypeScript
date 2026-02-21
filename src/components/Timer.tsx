import { ProgressRing } from './ProgressRing';
import { formatTime, getSessionColor } from '../utils/helpers';
import type { SessionType } from '../types';

interface TimerProps {
  sessionType: SessionType;
  timeLeft: number;
  totalTime: number;
}

export const Timer = ({ sessionType, timeLeft, totalTime }: TimerProps) => {
  const percentage = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const gradientClass = getSessionColor(sessionType);

  return (
    <div className="relative flex items-center justify-center">
      <ProgressRing
        percentage={percentage}
        size={300}
        strokeWidth={12}
        color={
          sessionType === 'pomodoro'
            ? '#ef4444'
            : sessionType === 'shortBreak'
            ? '#10b981'
            : '#3b82f6'
        }
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-8xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};