import React from 'react';
import { Clock, User, Calendar, CheckCircle } from 'lucide-react';
import { TrainingSession } from '../types/training';

interface ListViewProps {
  sessions: TrainingSession[];
  onSessionClick: (session: TrainingSession) => void;
}

export const ListView: React.FC<ListViewProps> = ({ sessions, onSessionClick }) => {
  const sortedSessions = [...sessions].sort((a, b) => {
    if (a.scheduledDate && b.scheduledDate) {
      return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
    }
    return a.month.localeCompare(b.month);
  });

  const themeColors = {
    Communication: 'border-l-blue-500 bg-blue-50',
    Sales: 'border-l-emerald-500 bg-emerald-50',
    Culture: 'border-l-purple-500 bg-purple-50',
    Retention: 'border-l-pink-500 bg-pink-50',
    Product: 'border-l-amber-500 bg-amber-50',
    Operations: 'border-l-slate-500 bg-slate-50',
    Marketing: 'border-l-orange-500 bg-orange-50'
  };

  return (
    <div className="space-y-4">
      {sortedSessions.map((session) => (
        <div
          key={session.id}
          onClick={() => onSessionClick(session)}
          className={`border-l-4 rounded-r-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg ${
            session.isCompleted 
              ? 'bg-gray-50 border-l-gray-400 opacity-75' 
              : themeColors[session.theme] || 'border-l-gray-500 bg-gray-50'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                {session.isCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {session.isLeadership && (
                  <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                    Leadership
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-3 line-clamp-2">{session.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{session.month}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{session.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{session.trainer}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  session.theme === 'Communication' ? 'bg-blue-100 text-blue-800' :
                  session.theme === 'Sales' ? 'bg-emerald-100 text-emerald-800' :
                  session.theme === 'Culture' ? 'bg-purple-100 text-purple-800' :
                  session.theme === 'Retention' ? 'bg-pink-100 text-pink-800' :
                  session.theme === 'Product' ? 'bg-amber-100 text-amber-800' :
                  session.theme === 'Operations' ? 'bg-slate-100 text-slate-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {session.theme}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{session.format}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};