export interface TrainingSession {
  id: string;
  title: string;
  duration: string;
  format: string;
  trainer: string;
  month: string;
  date: string;
  outcomes: string[];
  description: string;
  rationale: string;
  methods: string[];
  sources: string[];
  links: string[];
  theme: 'Communication' | 'Sales' | 'Culture' | 'Retention' | 'Product';
  isLeadership?: boolean;
  isCompleted?: boolean;
  icon: string;
  scheduledDate?: string;
}

export interface Month {
  name: string;
  sessions: TrainingSession[];
  focus: string;
}