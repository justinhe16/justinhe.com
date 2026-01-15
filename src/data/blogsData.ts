import { BlogCardData } from '@/types/cards';

export const blogsData: BlogCardData[] = [
  {
    id: 'creating-a-home-on-the-internet',
    category: 'blog',
    width: '1x',
    height: '1x',
    title: 'Creating a home on the internet',
    date: 'January 10, 2026',
    contentPreview: 'Exploring the latest features in Next.js 16 and how they improve the developer experience. From improved routing to better performance optimizations, this release brings exciting changes.',
    imageUrl: '/home.jpg',
    content: `This is where your full blog content goes. You can write in **Markdown**!

## Headings work

You can write multiple paragraphs here.

### Images are easy

Just use markdown image syntax:

![Example image](/angels-landing.png)

The modal will display this content when the card is clicked.

You can use:
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Lists
- And more!`,
    hasDetailPage: true,
  },
];
