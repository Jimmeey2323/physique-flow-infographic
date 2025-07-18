import React from 'react';
import { 
  Dumbbell, MessageSquare, Ear, Crown, TrendingUp, Users, 
  MessageCircle, Shield, Handshake, Clock, Target, Heart, 
  AlertTriangle, Smartphone, Zap, Calendar, Award, Monitor,
  Settings, Building, Megaphone, UserCheck, DollarSign, 
  RefreshCw, GraduationCap, Scale, Edit
} from 'lucide-react';
import { TrainingSession } from '../types/training';

interface TrainingCardProps {
  session: TrainingSession;
  onClick: () => void;
}

const iconMap = {
  Dumbbell, MessageSquare, Ear, Crown, TrendingUp, Users,
  MessageCircle, Shield, Handshake, Clock, Target, Heart,
  AlertTriangle, Smartphone, Zap, Calendar, Award, Monitor,
  Settings, Building, Megaphone, UserCheck, DollarSign,
  RefreshCw, GraduationCap, Scale, Edit
};

const themeColors = {
  Communication: 'bg-gradient-to-br from-blue-500 to-blue-600',
  Sales: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  Culture: 'bg-gradient-to-br from-purple-500 to-purple-600',
  Retention: 'bg-gradient-to-br from-pink-500 to-pink-600',
  Product: 'bg-gradient-to-br from-amber-500 to-amber-600',
  Operations: 'bg-gradient-to-br from-slate-500 to-slate-600',
  Marketing: 'bg-gradient-to-br from-orange-500 to-orange-600'
};

export const TrainingCard: React.FC<TrainingCardProps> = ({ session, onClick }) => {
  const IconComponent = iconMap[session.icon as keyof typeof iconMap];
  const themeColor = themeColors[session.theme];

  return (
    <div 
      onClick={onClick}
      className={`group relative rounded-2xl shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border overflow-hidden ${
        session.isCompleted 
          ? 'bg-gray-50 border-gray-200 opacity-75' 
          : 'bg-white border-gray-100 hover:shadow-xl'
      }`}
    >
      {session.isLeadership && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Leadership
          </div>
        </div>
      )}
      
      {session.isCompleted && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Completed
          </div>
        </div>
      )}
      
      <div className={`${themeColor} p-4 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 flex items-center space-x-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight truncate">
              {session.title}
            </h3>
            <p className="text-sm opacity-90">{session.trainer}</p>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">{session.format}</span>
          <span className="text-sm font-medium text-gray-800">{session.duration}</span>
        </div>
        
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
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
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {session.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Key Outcomes:</p>
          <ul className="space-y-1">
            {session.outcomes.slice(0, 2).map((outcome, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="line-clamp-1">{outcome}</span>
              </li>
            ))}
            {session.outcomes.length > 2 && (
              <li className="text-xs text-gray-500 font-medium">
                +{session.outcomes.length - 2} more outcomes
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {!session.isCompleted && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent transition-all duration-300"></div>
      )}
    </div>
  );
};