// Shared types for projects (used by both DB layer and components)

export interface PainPoint {
  icon: string;
  label: string;
  detail: string;
}

export interface Comparison {
  beforeLabel: string;
  beforeDescription: string;
  afterLabel: string;
  afterDescription: string;
  callout: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TechPivot {
  title: string;
  description: string;
}

export interface ComponentState {
  component: string;
  states: string[];
}

export interface Takeaway {
  label: string;
  value: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  url: string;
  sort_order: number;
  visible: boolean;
  caption: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
  headline: string;
  challenge: string;
  solution: string;
  role: string;
  timeline: string;
  tools: string[];
  pain_points: PainPoint[];
  comparison: Comparison;
  process: ProcessStep[];
  tech_pivot: TechPivot;
  component_states: ComponentState[];
  takeaways: Takeaway[];
  outcome: string;
  stakeholders: string;
  cover_caption: string;
  sort_order: number;
  published: boolean;
  images?: ProjectImage[];
}
