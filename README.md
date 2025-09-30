# Blog Platform

A fully functional, dynamic blog platform built with Next.js 15, MongoDB, and TypeScript. Features include blog management, search functionality, tag filtering, pagination, and an admin interface.

## 🚀 Live Demo

**[View Live Application](https://blog-app-assignment-3.vercel.app/)**

## Features

### Core Features
- **Dynamic Blog Pages**: Homepage listing all blog posts with title, description, and publish date
- **Individual Post Pages**: Accessible via dynamic routes using slugs
- **Database Integration**: MongoDB for storing and managing blog post data
- **Search & Filter**: Search by title/content and filter by tags
- **Pagination**: Efficient pagination for blog listings

### Admin Features
- **Admin Dashboard**: Simple interface to manage blog posts
- **Create/Edit Posts**: Rich form interface for blog management
- **Image Support**: Multiple images per blog post
- **Draft/Published Status**: Control post visibility
- **Tag Management**: Organize posts with tags

### Technical Features
- **REST API**: Complete API layer with optimized queries
- **Server-Side Rendering**: Next.js SSR for better SEO
- **Responsive Design**: Mobile-friendly interface
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Runtime**: Node.js

## API Endpoints

- `GET /api/blogs` - Returns paginated list of published blog posts
  - Query params: `page`, `limit`, `search`, `tag`
- `GET /api/blogs/[slug]` - Returns single blog post details
- `POST /api/blogs` - Creates new blog post (admin)
- `PUT /api/blogs/[slug]` - Updates existing blog post (admin)
- `DELETE /api/blogs/[slug]` - Deletes blog post (admin)
- `GET /api/tags` - Returns all unique tags

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/blog-app
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
   ```

4. **Database Setup**
   - Start MongoDB locally or ensure MongoDB Atlas is accessible
   - Seed the database with sample data:
   ```bash
   npm run seed
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## Project Structure

```
blog-app/
├── app/
│   ├── api/
│   │   ├── blogs/
│   │   │   ├── route.ts          # GET /api/blogs, POST /api/blogs
│   │   │   └── [slug]/
│   │   │       └── route.ts      # GET/PUT/DELETE /api/blogs/[slug]
│   │   └── tags/
│   │       └── route.ts          # GET /api/tags
│   ├── admin/
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── create/
│   │   │   └── page.tsx          # Create blog page
│   │   └── edit/
│   │       └── [slug]/
│   │           └── page.tsx      # Edit blog page
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/
│   ├── BlogCard.tsx              # Blog list item component
│   ├── BlogForm.tsx              # Admin form for creating/editing blogs
│   ├── Layout.tsx                # Main layout wrapper
│   ├── Pagination.tsx            # Pagination component
│   └── SearchFilter.tsx          # Search and filter component
├── lib/
│   └── dbConnect.ts              # MongoDB connection helper
├── models/
│   └── Blog.ts                   # Blog Mongoose schema
├── scripts/
│   └── seed.ts                   # Database seeding script
├── .env.local                    # Environment variables
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Dependencies

### Production Dependencies
- `next`: ^15.5.4 - React framework
- `react`: ^19.1.0 - UI library
- `react-dom`: ^19.1.0 - React DOM renderer
- `mongoose`: ^8.0.0 - MongoDB ODM

### Development Dependencies
- `typescript`: ^5 - Type checking
- `@types/node`: ^20 - Node.js type definitions
- `@types/react`: ^19 - React type definitions
- `@types/react-dom`: ^19 - React DOM type definitions
- `tailwindcss`: ^4 - CSS framework
- `eslint`: ^9 - Code linting
- `tsx`: ^4.0.0 - TypeScript execution

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## Database Schema

### Blog Model
```typescript
{
  title: String (required)
  slug: String (required, unique)
  content: String (required)
  excerpt: String (required)
  tags: [String]
  images: [String]
  published: Boolean (default: true)
  createdAt: Date (default: Date.now)
  updatedAt: Date (default: Date.now)
}
```

## Performance Optimizations

- **Database Indexing**: Text index on title, content, and tags for efficient search
- **Pagination**: Limit query results to prevent performance issues
- **Image Optimization**: Next.js automatic image optimization
- **Static Generation**: Leverages Next.js ISR where applicable

## Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Start the server: `npm start`

## AI Tool Usage Disclosure

This project was developed with assistance from Amazon Q Developer, an AI coding assistant. The AI was used for:

- Code structure and architecture planning
- Component implementation and TypeScript interfaces
- API route development and database integration
- Documentation and README creation
- Best practices recommendations

All code was reviewed, tested, and customized to meet the specific requirements of this blog platform.

## Future Enhancements

- Rich text editor (Markdown/WYSIWYG)
- Image upload functionality
- User authentication and authorization
- Comment system
- SEO optimizations
- Performance monitoring
- Automated testing suite

## License

MIT License - feel free to use this project for learning or commercial purposes.