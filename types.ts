
export type Locale = 'en' | 'zh';

export interface BilingualText {
  en: any;
  zh: any;
}

export interface ResearchProject {
  id: string;
  tag: BilingualText;
  title: BilingualText;
  description: BilingualText;
  link?: string;
  status: 'Published' | 'Working Paper' | 'In Progress' | 'Conference';
  authorRole?: BilingualText;
}

export interface TimelineEvent {
  year: string;
  title: BilingualText;
  institution: BilingualText;
  type: 'Education' | 'Award' | 'Talk' | 'Fieldwork';
}
