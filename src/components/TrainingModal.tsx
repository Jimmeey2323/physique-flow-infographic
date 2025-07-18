import React from 'react';
import { X, Clock, User, Calendar, Target, BookOpen, ExternalLink } from 'lucide-react';
import { TrainingSession } from '../types/training';

interface TrainingModalProps {
  session: TrainingSession | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TrainingModal: React.FC<TrainingModalProps> = ({ session, isOpen, onClose }) => {
  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">
              <div className="flex items-center space-x-4">
                {session.isLeadership && (
                  <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Leadership Session
                  </div>
                )}
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  session.theme === 'Communication' ? 'bg-blue-500 bg-opacity-30' :
                  session.theme === 'Sales' ? 'bg-emerald-500 bg-opacity-30' :
                  session.theme === 'Culture' ? 'bg-purple-500 bg-opacity-30' :
                  session.theme === 'Retention' ? 'bg-pink-500 bg-opacity-30' :
                  'bg-amber-500 bg-opacity-30'
                }`}>
                  {session.theme}
                </div>
              </div>
              <h2 className="text-3xl font-bold mt-4 mb-2">{session.title}</h2>
              <p className="text-indigo-100 text-lg">{session.month}</p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{session.duration}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Trainer</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{session.trainer}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Format</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{session.format}</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                    Description & Rationale
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{session.description}</p>
                  <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                    <p className="text-indigo-800 font-medium">{session.rationale}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-emerald-600" />
                    Key Outcomes
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {session.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Methods</h3>
                  <div className="flex flex-wrap gap-2">
                    {session.methods.map((method, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
                
                {session.sources.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Sources</h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="space-y-2">
                        {session.sources.map((source, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                            <span className="text-amber-800 font-medium">{source}</span>
                          </div>
                        ))}
                      </div>
                      {session.links.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-amber-200">
                          <p className="text-amber-700 text-sm font-medium mb-2">Referenced Links:</p>
                          <div className="space-y-1">
                            {session.links.map((link, index) => (
                              <a 
                                key={index}
                                href={`https://${link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 text-amber-700 hover:text-amber-900 text-sm underline"
                              >
                                <span>{link}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};