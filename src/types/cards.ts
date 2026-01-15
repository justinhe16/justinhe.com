export type CardWidth = '1x' | '2x';
export type CardHeight = '1x' | '2x';
export type CardCategory = 'blog' | 'project' | 'hobby';

export interface BlogCardData {
  id: string;
  category: 'blog';
  width: CardWidth;
  height: CardHeight;
  title: string;
  date: string;
  contentPreview: string; // First 2-3 sentences for typewriter effect on card hover
  imageUrl: string;
  content?: string; // Full blog content for detail page
  hasDetailPage?: boolean; // If true, routes to /blog/{id}, otherwise to /blog
}

export interface ProjectCardData {
  id: string;
  category: 'project';
  width: CardWidth;
  height: CardHeight;
  title: string;
  caption: string;
  imageUrl: string;
  hasDetailPage?: boolean; // If true, routes to /projects/{id}, otherwise to /projects
}

export interface HobbyCardData {
  id: string;
  category: 'hobby';
  width: CardWidth;
  height: CardHeight;
  activity: string; // e.g., "Climbing", "Surfing"
  imageUrl: string;
  videoUrl?: string; // Optional video URL that plays on hover
  hasDetailPage?: boolean; // If true, routes to /hobbies/{id}, otherwise to /hobbies
}

export type CardData = BlogCardData | ProjectCardData | HobbyCardData;
