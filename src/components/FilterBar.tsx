import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  themes: readonly string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ selectedTheme, onThemeChange, themes }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Filter className="w-4 h-4" />
          <span className="font-medium text-sm">Filter by Theme:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => onThemeChange(theme)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedTheme === theme
                  ? theme === 'Communication' ? 'bg-blue-600 text-white' :
                    theme === 'Sales' ? 'bg-emerald-600 text-white' :
                    theme === 'Culture' ? 'bg-purple-600 text-white' :
                    theme === 'Retention' ? 'bg-pink-600 text-white' :
                    theme === 'Product' ? 'bg-amber-600 text-white' :
                    theme === 'Operations' ? 'bg-slate-600 text-white' :
                    theme === 'Marketing' ? 'bg-orange-600 text-white' :
                    'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};