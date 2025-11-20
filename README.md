# Village Tobacco Farmers Portal

A modern web application built with React, Vite, TypeScript, Tailwind CSS, and Ant Design to showcase tobacco farmers profiles and their plantations in a village.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.2-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-blue)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.29.1-red)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Supabase Setup](#supabase-setup)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## ✨ Features

- **Farmer Profiles**: Comprehensive profiles of tobacco farmers with personal details, experience, and certifications
- **Plantation Management**: Track tobacco plantations with detailed information about location, size, variety, and status
- **Search & Filter**: Advanced search and filtering capabilities for farmers and plantations
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Modern UI**: Beautiful and intuitive interface built with Ant Design components
- **Type Safety**: Full TypeScript support for enhanced code quality and developer experience
- **Real-time Data**: Integrated with Supabase for real-time database operations
- **CRUD Operations**: Full create, read, update, and delete functionality for farmers and plantations

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.2** - Build tool with Rolldown
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Ant Design 5.29.1** - React UI component library
- **React Router 7.9.6** - Client-side routing
- **Supabase** - Backend as a Service (Database, Authentication, Storage)

## 📁 Project Structure

```
portal/
├── .github/
│   └── copilot-instructions.md   # GitHub Copilot instructions
├── .vscode/
│   └── tasks.json                # VS Code tasks
├── public/                        # Static assets
├── src/
│   ├── assets/                    # Images, icons, etc.
│   ├── components/                # Reusable UI components
│   │   ├── FarmerCard.tsx
│   │   ├── Header.tsx
│   │   └── PlantationCard.tsx
│   ├── hooks/                     # Custom React hooks
│   │   ├── useFarmers.ts
│   │   └── usePlantations.ts
│   ├── lib/                       # Library configurations
│   │   └── supabase.ts
│   ├── pages/                     # Page components
│   │   ├── Farmers.tsx
│   │   ├── Home.tsx
│   │   └── Plantations.tsx
│   ├── services/                  # API service layer
│   │   ├── farmerService.ts
│   │   └── plantationService.ts
│   ├── types/                     # TypeScript type definitions
│   │   ├── database.ts
│   │   └── farmer.ts
│   ├── utils/                     # Utility functions and data
│   │   └── mockData.ts
│   ├── App.css                    # App-specific styles
│   ├── App.tsx                    # Main App component
│   ├── index.css                  # Global styles
│   └── main.tsx                   # Application entry point
├── .env                           # Environment variables (Supabase credentials)
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── supabase-schema.sql            # Supabase database schema
├── supabase-seed.sql              # Sample data for Supabase
├── SUPABASE_SETUP.md              # Detailed Supabase setup guide
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Supabase account (free tier available at [supabase.com](https://supabase.com))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portal
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env` (or use existing `.env` file)
   - Update with your Supabase credentials:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Set up Supabase database:
   - See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions
   - Run `supabase-schema.sql` in Supabase SQL Editor
   - (Optional) Run `supabase-seed.sql` to insert sample data

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 🗄️ Supabase Setup

This application uses Supabase as the backend. Follow these steps to set up:

### Quick Setup

1. **Create tables**: Run `supabase-schema.sql` in Supabase SQL Editor
2. **Insert sample data** (optional): Run `supabase-seed.sql`
3. **Configure .env**: Add your Supabase credentials

### Detailed Guide

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for:
- Database schema details
- Row Level Security (RLS) policies
- API usage examples
- Authentication setup (optional)
- Troubleshooting guide

## 💻 Development

### Running the Development Server

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

### Using VS Code Tasks

This project includes VS Code tasks for common operations:

- Press `Cmd+Shift+B` (Mac) or `Ctrl+Shift+B` (Windows/Linux) to run the default build task
- Select "Start Dev Server" to launch the development server
- Select "Build" to create a production build

### Type Checking

The project uses TypeScript for type safety. The development server performs type checking in the background. For manual type checking:

```bash
npm run build
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New Farmers or Plantations

Mock data is stored in `src/utils/mockData.ts`. You can modify this file to add, edit, or remove farmers and plantations.

### Styling

- **Tailwind CSS**: Utility classes can be used throughout the application. Configuration is in `tailwind.config.js`
- **Ant Design**: Theme customization is done in `src/App.tsx` using the `ConfigProvider`
- **Custom CSS**: Add custom styles in component-specific CSS files or in `src/index.css`

### Types

TypeScript types are defined in `src/types/farmer.ts`. Add new types or modify existing ones as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with React and Vite
- UI components from Ant Design
- Styling with Tailwind CSS
- Icons from Ant Design Icons

---

For more information about the technologies used:

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Ant Design Documentation](https://ant.design/)

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
