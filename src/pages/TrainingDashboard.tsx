
import React, { useState } from 'react';
import { Calendar, Users, Clock, Award, Filter, LayoutGrid, Timeline, ChevronRight, Play, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TrainingSession {
  id: string;
  title: string;
  duration: string;
  format: string;
  trainer: string;
  month: string;
  category: 'Product' | 'Sales' | 'Communication' | 'Leadership' | 'Service' | 'Productivity';
  outcomes: string[];
  rationale: string;
  methods: string[];
  sources: string[];
  isLeadership?: boolean;
  completed?: boolean;
}

const TrainingDashboard = () => {
  const [viewMode, setViewMode] = useState<'timeline' | 'clusters'>('timeline');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const trainingData: TrainingSession[] = [
    // August 2025
    {
      id: 'aug-product',
      title: 'Product Mastery – Strength & Cycle',
      duration: '2–3h',
      format: 'Workshop',
      trainer: 'Master Trainer',
      month: 'August',
      category: 'Product',
      outcomes: [
        'Master class content and unique features',
        'Confidently explain pricing tiers',
        'Articulate value propositions effectively'
      ],
      rationale: 'Product training is critical when launching a new offering. Studies show thorough product knowledge improves rep confidence and customer trust.',
      methods: ['Interactive workshop', 'Feature deep-dive', 'Quiz assessment', 'Group exercises'],
      sources: ['training.safetyculture.com', 'masteroapp.com']
    },
    {
      id: 'aug-sales',
      title: 'Sales Pitch & Objection Workshop',
      duration: '2h',
      format: 'Role-play Lab',
      trainer: 'Sales Lead',
      month: 'August',
      category: 'Sales',
      outcomes: [
        'Perfect Strength & Cycle sales script',
        'Handle price and schedule objections',
        'Build persuasive storytelling skills'
      ],
      rationale: 'Role-play significantly improves objection-handling and communication skills, building confidence in real sales scenarios.',
      methods: ['Interactive scenarios', 'Script practice', 'Peer feedback', 'Closing techniques'],
      sources: ['showell.com']
    },
    {
      id: 'aug-comm',
      title: 'Communication Bootcamp',
      duration: '2h',
      format: 'Interactive Training',
      trainer: 'Communication Expert',
      month: 'August',
      category: 'Communication',
      outcomes: [
        'Master active listening techniques',
        'Ask effective clarifying questions',
        'Practice empathetic responses'
      ],
      rationale: 'Active listening is proven to make clients feel heard and increase satisfaction. Addresses feedback on poor listening skills.',
      methods: ['Paired exercises', 'Group coaching', 'Listening barriers workshop'],
      sources: ['training.safetyculture.com']
    },
    {
      id: 'aug-leadership',
      title: "Founder's Vision Session",
      duration: '1h',
      format: 'Fireside Chat',
      trainer: 'Mallika Parekh (Founder)',
      month: 'August',
      category: 'Leadership',
      isLeadership: true,
      outcomes: [
        'Understand company vision',
        'Connect with brand values',
        'Motivation for Strength & Cycle launch'
      ],
      rationale: 'Reinforcing core values helps reps embody the brand in every customer conversation and builds team alignment.',
      methods: ['Informal discussion', 'Story sharing', 'Q&A session'],
      sources: ['training.safetyculture.com']
    },
    // September 2025
    {
      id: 'sep-upsell',
      title: 'Upselling/Cross-selling Techniques',
      duration: '2h',
      format: 'Workshop',
      trainer: 'Revenue Specialist',
      month: 'September',
      category: 'Sales',
      outcomes: [
        'Identify upselling opportunities',
        'Position premium services as value-adds',
        'Build stronger customer relationships'
      ],
      rationale: 'Training on upselling leads to stronger customer relationships and higher sales by positioning additional services as solutions.',
      methods: ['Case studies', 'Pain point analysis', 'Solution pitching exercises'],
      sources: ['masteroapp.com']
    },
    {
      id: 'sep-profiling',
      title: 'Customer Profiling & Relationship Building',
      duration: '2h',
      format: 'Interactive Workshop',
      trainer: 'Customer Success Lead',
      month: 'September',
      category: 'Service',
      outcomes: [
        'Refine client persona understanding',
        'Tailor approaches to different segments',
        'Build trust through personalization'
      ],
      rationale: 'Customer profiling helps reps prioritize high-ROI leads and personalize conversations for better conversion rates.',
      methods: ['Persona exercises', 'Empathy mapping', 'Pitch customization'],
      sources: ['masteroapp.com']
    },
    {
      id: 'sep-comm-adv',
      title: 'Effective Communication Refresher',
      duration: '2h',
      format: 'Advanced Workshop',
      trainer: 'Communication Coach',
      month: 'September',
      category: 'Communication',
      outcomes: [
        'Master non-verbal communication',
        'Improve email etiquette',
        'Analyze and improve call performance'
      ],
      rationale: 'Active, attentive communication through listening and open-ended questions is central to winning customer trust.',
      methods: ['Video call analysis', 'Peer feedback sessions', 'Body language training'],
      sources: ['showell.com']
    },
    {
      id: 'sep-leadership',
      title: 'Leadership Q&A',
      duration: '1h',
      format: 'Open Forum',
      trainer: 'COO',
      month: 'September',
      category: 'Leadership',
      isLeadership: true,
      outcomes: [
        'Clarify company strategy',
        'Address team concerns',
        'Reinforce transparency'
      ],
      rationale: 'Open forums with leadership reinforce transparency and show senior commitment to team development.',
      methods: ['Open discussion', 'Strategy Q&A', 'Future planning'],
      sources: []
    },
    // October 2025
    {
      id: 'oct-negotiation',
      title: 'Advanced Negotiation & Objection Handling',
      duration: '2h',
      format: 'Role-play Workshop',
      trainer: 'Negotiation Expert',
      month: 'October',
      category: 'Sales',
      outcomes: [
        'Master structured bargaining techniques',
        'Create win-win outcomes',
        'Handle price objections confidently'
      ],
      rationale: 'Sales reps trained in negotiation can secure better deals without sacrificing margins through structured approaches.',
      methods: ['Simulated negotiations', 'Trade-off strategies', 'Win-win scenarios'],
      sources: ['masteroapp.com']
    },
    {
      id: 'oct-productivity',
      title: 'Time Management & Productivity Hacks',
      duration: '2h',
      format: 'Workshop',
      trainer: 'Productivity Coach',
      month: 'October',
      category: 'Productivity',
      outcomes: [
        'Prioritize high-value activities',
        'Optimize CRM usage',
        'Minimize administrative downtime'
      ],
      rationale: 'Time management and productivity training is proven essential for sales team success and efficiency.',
      methods: ['Tool training', 'Task batching', 'Productivity sharing'],
      sources: ['showell.com']
    },
    {
      id: 'oct-coo',
      title: 'COO Strategy Workshop',
      duration: '1–2h',
      format: 'Strategy Session',
      trainer: 'COO',
      month: 'October',
      category: 'Leadership',
      isLeadership: true,
      outcomes: [
        'Align sales targets with company goals',
        'Clarify performance expectations',
        'Understand operational priorities'
      ],
      rationale: 'Clear goal alignment ensures everyone understands how success is measured and connects individual performance to company objectives.',
      methods: ['Metrics review', 'Goal setting', 'Operational Q&A'],
      sources: ['showell.com']
    },
    // November 2025
    {
      id: 'nov-retention',
      title: 'Customer Loyalty & Service Recovery',
      duration: '2h',
      format: 'Scenario Training',
      trainer: 'Service Recovery Specialist',
      month: 'November',
      category: 'Service',
      outcomes: [
        'Turn complaints into retention opportunities',
        'Master de-escalation techniques',
        'Build stronger customer loyalty'
      ],
      rationale: 'Empathy and active listening lead to stronger retention and loyalty by turning negative experiences into positive outcomes.',
      methods: ['Service recovery cases', 'De-escalation practice', 'Apology language training'],
      sources: ['training.safetyculture.com']
    },
    {
      id: 'nov-crisis',
      title: 'Crisis Management & Professional Tone',
      duration: '2h',
      format: 'Scenario-based Training',
      trainer: 'Crisis Management Expert',
      month: 'November',
      category: 'Service',
      outcomes: [
        'Handle unexpected facility issues',
        'Maintain consistent brand voice',
        'Respond professionally across channels'
      ],
      rationale: 'Tone-of-voice consistency is key to customer trust across all communication channels including social media support.',
      methods: ['Crisis simulations', 'Multi-channel response training', 'Brand voice practice'],
      sources: ['training.safetyculture.com']
    },
    {
      id: 'nov-digital',
      title: 'Social Media & Digital Engagement',
      duration: '2h',
      format: 'Digital Training',
      trainer: 'Digital Engagement Specialist',
      month: 'November',
      category: 'Communication',
      outcomes: [
        'Manage social platform inquiries',
        'Provide timely, branded responses',
        'Build online community engagement'
      ],
      rationale: 'Quick and responsive online support is increasingly important as clients reach out via Instagram and Facebook.',
      methods: ['Platform-specific training', 'Response templates', 'Community building strategies'],
      sources: ['training.safetyculture.com']
    },
    // December 2025
    {
      id: 'dec-review',
      title: '2025 Review & 2026 Kickoff',
      duration: '2h',
      format: 'Group Session',
      trainer: 'Leadership Team',
      month: 'December',
      category: 'Leadership',
      outcomes: [
        'Celebrate 2025 achievements',
        'Learn from challenges',
        'Set 2026 targets and goals'
      ],
      rationale: 'Celebrating successes and setting new goals is key to maintaining team engagement and continuous improvement.',
      methods: ['Achievement review', 'Lessons learned session', 'Goal setting for 2026'],
      sources: []
    },
    {
      id: 'dec-showcase',
      title: 'Interactive Skills Showcase',
      duration: '2h',
      format: 'Competition/Workshop',
      trainer: 'Team Leaders',
      month: 'December',
      category: 'Sales',
      outcomes: [
        'Demonstrate learned skills',
        'Practice in low-stakes environment',
        'Build team camaraderie'
      ],
      rationale: 'Gamified skill demonstration reinforces learning in a relaxed, engaging setting while building team spirit.',
      methods: ['Shark Tank competition', 'Role-play contests', 'Peer recognition'],
      sources: []
    }
  ];

  const completedSessions = [
    'How to handle Sales Objections', 'Handling Pricing Objections', 'The A-A-A Framework - 1',
    'Balancing between Sales & Client Servicing', 'Shift Handovers & Handover Process',
    'Sales Training with MTP', 'Active Listening - Shifa', 'Role Playing', 'Shark Tank - The Sales Pitch',
    'Sell me this Pen', 'Productivity Hacks & Tricks', 'Feedback System - 1', 'Feedback System - 2',
    'The A-A-A Framework - 2', 'Service Recovery', 'Client Personas - 1', 'Client Personas - 2',
    'Client Personas - 3', 'Mastering High Ticket Sales'
  ];

  const categoryColors = {
    Product: 'bg-blue-100 text-blue-800 border-blue-200',
    Sales: 'bg-green-100 text-green-800 border-green-200',
    Communication: 'bg-purple-100 text-purple-800 border-purple-200',
    Leadership: 'bg-gold-100 text-gold-800 border-gold-200',
    Service: 'bg-pink-100 text-pink-800 border-pink-200',
    Productivity: 'bg-orange-100 text-orange-800 border-orange-200'
  };

  const categoryIcons = {
    Product: Play,
    Sales: Award,
    Communication: Users,
    Leadership: Star,
    Service: Quote,
    Productivity: Clock
  };

  const filteredSessions = filterCategory === 'all' 
    ? trainingData 
    : trainingData.filter(session => session.category.toLowerCase() === filterCategory);

  const groupedByMonth = filteredSessions.reduce((acc, session) => {
    if (!acc[session.month]) acc[session.month] = [];
    acc[session.month].push(session);
    return acc;
  }, {} as Record<string, TrainingSession[]>);

  const groupedByCategory = filteredSessions.reduce((acc, session) => {
    if (!acc[session.category]) acc[session.category] = [];
    acc[session.category].push(session);
    return acc;
  }, {} as Record<string, TrainingSession[]>);

  const SessionCard = ({ session }: { session: TrainingSession }) => {
    const IconComponent = categoryIcons[session.category];
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
            session.isLeadership ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50' : ''
          }`}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                    {session.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={categoryColors[session.category]}>
                      <IconComponent className="w-3 h-3 mr-1" />
                      {session.category}
                    </Badge>
                    {session.isLeadership && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Star className="w-3 h-3 mr-1" />
                        Leadership
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{session.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{session.trainer}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {session.format}
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">{session.title}</DialogTitle>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className={categoryColors[session.category]}>
                <IconComponent className="w-3 h-3 mr-1" />
                {session.category}
              </Badge>
              {session.isLeadership && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  <Star className="w-3 h-3 mr-1" />
                  Leadership Session
                </Badge>
              )}
            </div>
          </DialogHeader>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              <TabsTrigger value="methods">Methods</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Duration</h4>
                  <p className="text-gray-600">{session.duration}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Format</h4>
                  <p className="text-gray-600">{session.format}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Lead Trainer</h4>
                  <p className="text-gray-600">{session.trainer}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Month</h4>
                  <p className="text-gray-600">{session.month} 2025</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Rationale</h4>
                <p className="text-gray-700 leading-relaxed">{session.rationale}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="outcomes" className="space-y-4">
              <h4 className="font-medium text-gray-900 mb-2">Key Learning Outcomes</h4>
              <ul className="space-y-2">
                {session.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="methods" className="space-y-4">
              <h4 className="font-medium text-gray-900 mb-2">Training Methods</h4>
              <div className="grid grid-cols-2 gap-2">
                {session.methods.map((method, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700 text-sm">{method}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="research" className="space-y-4">
              <h4 className="font-medium text-gray-900 mb-2">Research Sources</h4>
              {session.sources.length > 0 ? (
                <ul className="space-y-2">
                  {session.sources.map((source, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Quote className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-600 hover:underline cursor-pointer">{source}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No external sources cited for this session.</p>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Physique 57 Sales & Client Service Training
              </h1>
              <p className="text-gray-600">August – December 2025 Training Plan</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {completedSessions.length} Sessions Completed (H1 2025)
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {trainingData.length} Sessions Planned (H2 2025)
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'outline'}
              onClick={() => setViewMode('timeline')}
              className="flex items-center gap-2"
            >
              <Timeline className="w-4 h-4" />
              Timeline View
            </Button>
            <Button
              variant={viewMode === 'clusters' ? 'default' : 'outline'}
              onClick={() => setViewMode('clusters')}
              className="flex items-center gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              Topic Clusters
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="product">Product</option>
              <option value="sales">Sales</option>
              <option value="communication">Communication</option>
              <option value="leadership">Leadership</option>
              <option value="service">Service</option>
              <option value="productivity">Productivity</option>
            </select>
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="space-y-12">
            {Object.entries(groupedByMonth).map(([month, sessions]) => (
              <div key={month} className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                    {month} 2025
                  </div>
                  <div className="h-px bg-gray-200 flex-1" />
                  <Badge variant="outline" className="text-sm">
                    {sessions.length} session{sessions.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clusters View */}
        {viewMode === 'clusters' && (
          <div className="space-y-12">
            {Object.entries(groupedByCategory).map(([category, sessions]) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <div key={category} className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${categoryColors[category as keyof typeof categoryColors]}`}>
                      <IconComponent className="w-4 h-4" />
                      {category}
                    </div>
                    <div className="h-px bg-gray-200 flex-1" />
                    <Badge variant="outline" className="text-sm">
                      {sessions.length} session{sessions.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sessions.map((session) => (
                      <SessionCard key={session.id} session={session} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{trainingData.length}</div>
              <div className="text-sm text-gray-600">Total Sessions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {trainingData.reduce((acc, session) => acc + parseInt(session.duration.split('–')[0] || session.duration.split('h')[0]), 0)}+
              </div>
              <div className="text-sm text-gray-600">Training Hours</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {trainingData.filter(s => s.isLeadership).length}
              </div>
              <div className="text-sm text-gray-600">Leadership Sessions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
              <div className="text-sm text-gray-600">Skill Categories</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboard;
