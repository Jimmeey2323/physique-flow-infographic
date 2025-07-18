import React from 'react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { TrainingSession } from '../types/training';

interface CalendarViewProps {
  sessions: TrainingSession[];
  onSessionClick: (session: TrainingSession) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ sessions, onSessionClick }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2025, 7)); // August 2025

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getSessionsForDate = (date: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return sessions.filter(session => session.scheduledDate === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty days */}
          {emptyDays.map(day => (
            <div key={`empty-${day}`} className="h-24"></div>
          ))}
          
          {/* Days with content */}
          {days.map(day => {
            const sessionsForDay = getSessionsForDate(day);
            const isWednesday = (firstDay + day - 1) % 7 === 3;
            
            return (
              <div
                key={day}
                className={`h-24 border border-gray-100 rounded-lg p-2 ${
                  isWednesday ? 'bg-blue-50' : 'bg-gray-50'
                }`}
              >
                <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                <div className="space-y-1">
                  {sessionsForDay.map(session => (
                    <div
                      key={session.id}
                      onClick={() => onSessionClick(session)}
                      className={`text-xs p-1 rounded cursor-pointer transition-all duration-200 hover:scale-105 ${
                        session.isCompleted
                          ? 'bg-gray-200 text-gray-600'
                          : session.theme === 'Communication' ? 'bg-blue-100 text-blue-800' :
                            session.theme === 'Sales' ? 'bg-emerald-100 text-emerald-800' :
                            session.theme === 'Culture' ? 'bg-purple-100 text-purple-800' :
                            session.theme === 'Retention' ? 'bg-pink-100 text-pink-800' :
                            session.theme === 'Product' ? 'bg-amber-100 text-amber-800' :
                            session.theme === 'Operations' ? 'bg-slate-100 text-slate-800' :
                            'bg-orange-100 text-orange-800'
                      }`}
                    >
                      <div className="font-medium truncate">{session.title}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{session.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};