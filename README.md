# Dashboard App

A modern, feature-rich dashboard application built with React Router, Prisma, and Tailwind CSS. Create, organize, and manage multiple dashboards with customizable cards for quick access to your favorite links and resources.

## Features

### 🎯 Dashboard Management
- **Create Multiple Dashboards** - Organize your content across different themed dashboards
- **Visibility Controls** - Set dashboards as Private, Public, or Global
- **Auto-Select** - First dashboard automatically loads on page visit
- **Real-time Updates** - Changes reflect immediately across the app

### 🎴 Card System
- **Visual Cards** - Beautiful image-based cards with overlay titles
- **Quick Access** - Direct links to your favorite websites and resources
- **Easy Management** - Create, edit, and delete cards with intuitive modals
- **Compact Layout** - Responsive grid that fits 3-10 cards per row depending on screen size
- **Fallback Icons** - Auto-generated icons for cards without images

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Beautiful backdrop blur effects and translucent panels
- **Dark Mode** - Sleek dark theme with vibrant accents
- **Responsive Grid** - Adapts seamlessly from mobile to desktop
- **Smooth Animations** - Polished hover effects and transitions
- **Icon System** - Visual indicators for dashboard visibility levels

### 🔐 User Authentication
- **Secure Sessions** - User authentication with session management
- **Protected Routes** - Dashboard access restricted to authenticated users
- **User-specific Content** - Each user sees only their own dashboards

## Tech Stack

- **React Router 7** - File-based routing and data loading
- **Prisma** - Type-safe database ORM
- **TypeScript** - Full type safety across the application
- **Tailwind CSS** - Utility-first styling
- **PostgreSQL** - Robust relational database (or your choice of DB)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (or your preferred database)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Saajaadeen/dashboard-app.git
cd dashboard-app
```

2. Install dependencies
```bash
npm install
```

3. Set up your environment variables
```bash
cp .env.example .env
```

Configure your `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dashboard_db"
SESSION_SECRET="your-secret-key-here"
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## Project Structure

```
dashboard-app/
├── app/
│   ├── routes/
│   │   ├── dashboard/
│   │   │   ├── dashboard.tsx          # Main dashboard view
│   │   │   ├── dashboardcreate.tsx    # Create new dashboard
│   │   │   └── dashboardedit.tsx      # Edit existing dashboard
│   │   └── card/
│   │       ├── cardcreate.tsx         # Create new card
│   │       └── cardedit.tsx           # Edit/delete card
│   └── components/
│       ├── forms/
│       │   ├── DashboardSidebarForm.tsx
│       │   └── DashboardDisplayForm.tsx
│       ├── modals/
│       │   ├── CardCreateModal.tsx
│       │   └── CardEditModal.tsx
│       └── icons/
├── server/
│   ├── card.queries.server.ts         # Card database queries
│   ├── dashboard.queries.server.ts    # Dashboard database queries
│   └── session.server.ts              # Auth & session management
├── prisma/
│   └── schema.prisma                  # Database schema
└── package.json
```

## Key Features Explained

### Dashboard Sidebar
- Groups dashboards by visibility (Private, Global, Public)
- Shows most recent dashboards first
- Hover to reveal edit button
- Click any dashboard to view its cards

### Card Grid
- Compact, square cards with full-bleed images
- Card name appears as overlay at bottom
- "Add Card" button seamlessly integrated in grid
- Supports up to 10 cards per row on large screens

### Modal System
- Create/Edit modals with glassmorphism design
- Form validation for required fields
- Delete confirmation checkbox for safety
- Closes and redirects on successful submission

## API Routes

### Dashboards
- `GET /dashboard` - View all dashboards and cards
- `GET /dashboard/create` - Dashboard creation form
- `POST /dashboard/create` - Create new dashboard
- `GET /dashboard/:id/edit` - Dashboard edit form
- `POST /dashboard/:id/edit` - Update or delete dashboard

### Cards
- `GET /dashboard/:dashboardId/card/create` - Card creation form
- `POST /dashboard/:dashboardId/card/create` - Create new card
- `GET /dashboard/:dashboardId/card/:cardId/edit` - Card edit form
- `POST /dashboard/:dashboardId/card/:cardId/edit` - Update or delete card

## Development

### Database Management
```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

### Type Generation
```bash
# Generate Prisma Client types
npx prisma generate
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [React Router](https://reactrouter.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ by Saajaadeen 