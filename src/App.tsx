import React, { useState, useMemo } from 'react';
import { GraduationCap, Users, Clock, Award, CheckCircle } from 'lucide-react';
import { TrainingCard } from './components/TrainingCard';
import { TrainingModal } from './components/TrainingModal';
import { ViewToggle, ViewType } from './components/ViewToggle';
import { FilterBar } from './components/FilterBar';
import { StatsCard } from './components/StatsCard';
import { CalendarView } from './components/CalendarView';
import { AnalyticsView } from './components/AnalyticsView';
import { ListView } from './components/ListView';
import { trainingData, themes, completedSessions } from './data/trainingData';
import { TrainingSession } from './types/training';

function App() {
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<ViewType>('timeline');
  const [selectedTheme, setSelectedTheme] = useState('All');

  const filteredSessions = useMemo(() => {
    const upcomingSessions = trainingData.flatMap(month => month.sessions);
    const allSessions = [...completedSessions, ...upcomingSessions];
    if (selectedTheme === 'All') return allSessions;
    return allSessions.filter(session => session.theme === selectedTheme);
  }, [selectedTheme]);

  const clusterSessions = useMemo(() => {
    const clusters: Record<string, TrainingSession[]> = {};
    filteredSessions.forEach(session => {
      if (!clusters[session.theme]) {
        clusters[session.theme] = [];
      }
      clusters[session.theme].push(session);
    });
    return clusters;
  }, [filteredSessions]);

  const handleCardClick = (session: TrainingSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  const totalSessions = trainingData.reduce((acc, month) => acc + month.sessions.length, 0);
  const totalAllSessions = totalSessions + completedSessions.length;
  const leadershipSessions = trainingData.reduce((acc, month) => 
    acc + month.sessions.filter(s => s.isLeadership).length, 0);
  const totalHours = [...completedSessions, ...trainingData.flatMap(month => month.sessions)].reduce((acc, session) => {
    const hours = session.duration.includes('1-2') ? 1.5 : 
                 session.duration.includes('2-3') ? 2.5 : 
                 parseFloat(session.duration) || 2;
    return acc + hours;
  }, 0);
  const upcomingHours = trainingData.reduce((acc, month) => 
    acc + month.sessions.reduce((monthAcc, session) => {
      const hours = session.duration.includes('1-2') ? 1.5 : 
                   session.duration.includes('2-3') ? 2.5 : 
                   parseFloat(session.duration) || 2;
      return monthAcc + hours;
    }, 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white rounded-3xl px-8 py-4 shadow-xl border border-gray-100 mb-8">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Physique 57
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Sales & Client Service Training Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive training roadmap spanning January–December 2025, designed to elevate 
            team performance, launch our new Strength & Cycle program, and achieve operational excellence.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatsCard 
            title="Total Sessions (2025)" 
            value={totalAllSessions.toString()} 
            icon={GraduationCap} 
            color="bg-indigo-600" 
          />
          <StatsCard 
            title="Completed Sessions" 
            value={completedSessions.length.toString()} 
            icon={CheckCircle} 
            color="bg-green-600" 
          />
          <StatsCard 
            title="Training Hours" 
            value={`${Math.round(totalHours)}h total`} 
            icon={Clock} 
            color="bg-blue-600" 
          />
          <StatsCard 
            title="Upcoming Hours" 
            value={`${Math.round(upcomingHours)}h`} 
            icon={Award} 
            color="bg-purple-600" 
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <ViewToggle view={view} onViewChange={setView} />
          <FilterBar 
            selectedTheme={selectedTheme} 
            onThemeChange={setSelectedTheme} 
            themes={themes} 
          />
        </div>

        {/* Training Content */}
        {view === 'timeline' && (
          <div className="space-y-12">
            {/* Completed Sessions Section */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white">
                <h2 className="text-3xl font-bold mb-2">Completed Training (Jan-July 2025)</h2>
                <p className="text-green-100 text-lg">{completedSessions.length} sessions successfully completed</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {completedSessions
                    .filter(session => selectedTheme === 'All' || session.theme === selectedTheme)
                    .map((session) => (
                      <TrainingCard
                        key={session.id}
                        session={session}
                        onClick={() => handleCardClick(session)}
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            {trainingData.map((month) => (
              <div key={month.name} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{month.name}</h2>
                  <p className="text-gray-300 text-lg">{month.focus}</p>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {month.sessions
                      .filter(session => selectedTheme === 'All' || session.theme === selectedTheme)
                      .map((session) => (
                        <TrainingCard
                          key={session.id}
                          session={session}
                          onClick={() => handleCardClick(session)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'clusters' && (
          <div className="space-y-8">
            {Object.entries(clusterSessions).map(([theme, sessions]) => (
              <div key={theme} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className={`px-8 py-6 text-white ${
                  theme === 'Communication' ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                  theme === 'Sales' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' :
                  theme === 'Culture' ? 'bg-gradient-to-r from-purple-600 to-purple-700' :
                  theme === 'Retention' ? 'bg-gradient-to-r from-pink-600 to-pink-700' :
                  theme === 'Product' ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
                  theme === 'Operations' ? 'bg-gradient-to-r from-slate-600 to-slate-700' :
                  'bg-gradient-to-r from-orange-600 to-orange-700'
                }`}>
                  <h2 className="text-3xl font-bold mb-2">{theme} Training</h2>
                  <p className="text-gray-100 text-lg">{sessions.length} sessions across the training period</p>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sessions.map((session) => (
                      <TrainingCard
                        key={session.id}
                        session={session}
                        onClick={() => handleCardClick(session)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'calendar' && (
          <CalendarView 
            sessions={filteredSessions} 
            onSessionClick={handleCardClick} 
          />
        )}

        {view === 'analytics' && (
          <AnalyticsView 
            sessions={trainingData.flatMap(month => month.sessions)} 
            completedSessions={completedSessions} 
          />
        )}

        {view === 'list' && (
          <ListView 
            sessions={filteredSessions} 
            onSessionClick={handleCardClick} 
          />
        )}
      </div>

      <TrainingModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;