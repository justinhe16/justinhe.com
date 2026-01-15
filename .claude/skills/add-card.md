# Add Card Skill

This skill helps you add new cards to Justin's portfolio website.

## Card Types

There are three types of cards you can add:

1. **Blog Cards** - For blog posts and writings
2. **Project Cards** - For projects and work
3. **Hobby Cards** - For hobbies and personal activities

## Card Dimensions

Cards can have different dimensions:

- **Width**: `'1x'` (1 column) or `'2x'` (2 columns)
- **Height**: `'1x'` (1 row) or `'2x'` (2 rows)

### Dimension Combinations

- **1x1** - Standard card (most common)
- **2x1** - Wide card (spans 2 columns, good for landscape images)
- **1x2** - Tall card (spans 2 rows, good for portrait images)
- **2x2** - Large card (possible but rarely used)

### Layout Considerations

**Homepage (2-column grid):**
- Mix of 1x1, 2x1, and 1x2 cards
- Tall cards (1x2) should be paired with two 1x1 cards
- Wide cards (2x1) take full width

**Focus Pages (3-column grid):**
- Primarily 1x1 cards work best
- Wide cards (2x1) can be used but will only span 2 of 3 columns
- Consider the 3-column layout when choosing dimensions

## Adding a Card

### Step 1: Add the card to the appropriate data file

**For Blog Cards:** Edit `/src/data/blogsData.ts`

```typescript
{
  id: 'unique-blog-id',           // Unique identifier
  category: 'blog',
  width: '1x',                     // '1x' or '2x'
  height: '1x',                    // '1x' or '2x'
  title: 'Blog Post Title',
  date: 'January 13, 2026',
  contentPreview: 'Short preview text that shows on card hover...',
  content: `Full blog content in Markdown.

You can use:
- **Bold** and *italic*
- ![Images](/path-to-image.jpg)
- ## Headings
- [Links](https://example.com)
`,
  link: {
    type: 'modal',                 // 'modal' or 'external'
    url: '/blog/unique-blog-id',
  },
}
```

**For Project Cards:** Edit `/src/data/projectsData.ts`

```typescript
{
  id: 'unique-project-id',
  category: 'project',
  width: '1x',
  height: '1x',
  title: 'Project Name',
  caption: 'Brief description',
  imageUrl: '/path-to-image.jpg',  // Or external URL
  link: {
    type: 'external',              // 'modal' or 'external'
    url: 'https://github.com/...',
  },
}
```

**For Hobby Cards:** Edit `/src/data/hobbiesData.ts`

```typescript
{
  id: 'unique-hobby-id',
  category: 'hobby',
  width: '2x',
  height: '1x',
  activity: 'Description of hobby activity',
  imageUrl: '/path-to-image.jpg',
  link: {                          // Optional
    type: 'modal',
    url: '/hobbies/unique-hobby-id',
  },
}
```

### Step 2: Add images to /public folder

If using local images:
1. Place image in `/public/` directory
2. Reference as `/image-name.jpg` (not `/public/image-name.jpg`)

### Step 3: Add to homepage (optional)

To display on homepage, edit `/src/data/homePageCards.ts`:

```typescript
const homePageCardIds = [
  'hobby-angels-landing',
  'quitting-my-job',
  'unique-project-id',      // Add your card ID here
  'hobby-mentawai-surfing',
];
```

Cards appear on homepage in the order listed.

## Link Types

**Modal Links** (`type: 'modal'`):
- Opens full-page modal with content
- Uses book icon (📖)
- Best for blog posts and detailed content

**External Links** (`type: 'external'`):
- Opens URL in new tab
- Uses arrow icon (↗)
- Best for GitHub repos, external sites

**No Link** (omit `link` property):
- Card is not clickable
- No icon displayed
- Best for display-only content

## Card Behavior by Type

### Blog Cards
- Show title and date
- Hover: Word-by-word typewriter animation showing `contentPreview`
- Click: Opens modal with full `content` (Markdown supported)

### Project Cards
- Show title and caption over image
- Hover: Image zooms/focuses
- Click: Opens modal or external link

### Hobby Cards
- Show only image initially
- Hover: Image slides down 40px revealing activity text
- Click: Opens modal or external link (if provided)

## Examples

**Add a tall blog card:**
```typescript
// In blogsData.ts
{
  id: 'my-new-post',
  category: 'blog',
  width: '1x',
  height: '2x',  // Tall card
  title: 'My New Blog Post',
  date: 'January 13, 2026',
  contentPreview: 'This is the preview text...',
  content: 'Full content here...',
  link: { type: 'modal', url: '/blog/my-new-post' },
}

// In homePageCards.ts - pair with two 1x1 cards
const homePageCardIds = [
  'my-new-post',      // 1x2 tall card
  'other-card-1',     // 1x1 card
  'other-card-2',     // 1x1 card
];
```

**Add a wide hobby card:**
```typescript
// In hobbiesData.ts
{
  id: 'surfing-mentawai',
  category: 'hobby',
  width: '2x',  // Wide card
  height: '1x',
  activity: 'Surfing in Mentawai',
  imageUrl: '/mentawai.jpg',
}
```

## Tips

- **Images**: Use high-quality images, recommended minimum 800px width for 1x cards, 1600px for 2x
- **Content Preview**: Keep to 2-3 sentences, about 150-200 characters
- **Activity Names**: For hobbies, be descriptive but concise
- **IDs**: Use kebab-case, be descriptive (e.g., 'project-portfolio-site')
- **Dates**: Use full format "Month DD, YYYY"

## Where Cards Appear

- **Homepage**: Only cards listed in `homePageCards.ts`
- **Projects Page**: All cards from `projectsData.ts`
- **Hobbies Page**: All cards from `hobbiesData.ts`
- **Blog Page**: All cards from `blogsData.ts`
