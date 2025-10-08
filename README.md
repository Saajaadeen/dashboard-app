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

3. Start docker container
```bash
docker compose up
```

4. Run database migrations (Docker must be running)
```bash
npx prisma migrate reset
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

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
