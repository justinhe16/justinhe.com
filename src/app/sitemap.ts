import type { MetadataRoute } from 'next';
import { projectsData } from '@/data/projectsData';
import { blogsData } from '@/data/blogsData';
import { hobbiesData } from '@/data/hobbiesData';

const BASE_URL = 'https://justinhe.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/projects', priority: 0.8 },
    { path: '/blog', priority: 0.8 },
    { path: '/hobbies', priority: 0.8 },
    { path: '/a', priority: 0.5 },
    { path: '/b', priority: 0.5 },
    { path: '/c', priority: 0.5 },
  ].map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority,
  }));

  const dynamicRoutes = [
    ...projectsData.map((item) => `/projects/${item.id}`),
    ...blogsData.map((item) => `/blog/${item.id}`),
    ...hobbiesData.map((item) => `/hobbies/${item.id}`),
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
