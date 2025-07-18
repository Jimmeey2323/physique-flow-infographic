import React from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Clock, Award } from 'lucide-react';
import { TrainingSession } from '../types/training';

interface AnalyticsViewProps {
  sessions: TrainingSession[];
  completedSessions: TrainingSession[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ sessions, completedSessions }) => {
  const allSessions = [...completedSessions, ...sessions];
  
  const themeStats = allSessions.reduce((acc, session) => {
    acc[session.theme] = (acc[session.theme] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const trainerStats = allSessions.reduce((acc, session) => {
    acc[session.trainer] = (acc[session.trainer] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const completionRate = (completedSessions.length / allSessions.length) * 100;

  const themeColors = {
    Communication: 'bg-blue-500',
    Sales: 'bg-emerald-500',
    Culture: 'bg-purple-500',
    Retention: 'bg-pink-500',
    Product: 'bg-amber-500',
    Operations: 'bg-slate-500',
    Marketing: 'bg-orange-500'
  };

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-indigo-100">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Sessions</h3>
              <p className="text-2xl font-bold text-gray-900">{allSessions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-green-100">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Completed</h3>
              <p className="text-2xl font-bold text-gray-900">{completedSessions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-blue-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Progress</h3>
              <p className="text-2xl font-bold text-gray-900">{Math.round(completionRate)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-purple-100">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Trainers</h3>
              <p className="text-2xl font-bold text-gray-900">{Object.keys(trainerStats).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Distribution */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-indigo-600" />
          Training Distribution by Theme
        </h3>
        <div className="space-y-4">
          {Object.entries(themeStats).map(([theme, count]) => {
            const percentage = (count / allSessions.length) * 100;
            return (
              <div key={theme} className="flex items-center">
                <div className="w-24 text-sm font-medium text-gray-700">{theme}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${themeColors[theme as keyof typeof themeColors] || 'bg-gray-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">
                  {count} ({Math.round(percentage)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trainer Workload */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Users className="w-5 h-5 mr-2 text-indigo-600" />
          Trainer Workload Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(trainerStats)
            .sort(([,a], [,b]) => b - a)
            .map(([trainer, count]) => (
              <div key={trainer} className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{trainer}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-indigo-600">{count}</span>
                  <span className="text-sm text-gray-600">sessions</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};