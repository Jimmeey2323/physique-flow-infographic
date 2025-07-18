import React from 'react';
import { Calendar, Grid3X3, BarChart3, Clock, List } from 'lucide-react';

export type ViewType = 'timeline' | 'clusters' | 'calendar' | 'analytics' | 'list';

interface ViewToggleProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

const viewOptions = [
  { key: 'timeline' as const, label: 'Timeline', icon: Calendar },
  { key: 'clusters' as const, label: 'By Skills', icon: Grid3X3 },
  { key: 'calendar' as const, label: 'Calendar', icon: Calendar },
  { key: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  { key: 'list' as const, label: 'List View', icon: List }
];

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="bg-white rounded-2xl p-1 shadow-lg border border-gray-100">
      <div className="flex flex-wrap gap-1">
        {viewOptions.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onViewChange(key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium ${
              view === key 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};