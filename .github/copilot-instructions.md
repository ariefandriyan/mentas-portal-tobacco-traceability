# Village Tobacco Farmers Profile Website

## Project Overview
This is a React + Vite project with Tailwind CSS and Ant Design for showcasing tobacco farmers profiles and their plantations in a village. The application is integrated with Supabase for real-time database operations.

## Tech Stack
- React 19.2
- Vite 7.2
- TypeScript 5.9
- Tailwind CSS 4.1
- Ant Design 5.29
- Supabase (Database & Backend)
- React Router 7.9

## Project Structure
- `src/components/` - Reusable UI components (FarmerCard, PlantationCard, Header)
- `src/pages/` - Page components (Home, Farmers, Plantations)
- `src/hooks/` - Custom React hooks (useFarmers, usePlantations)
- `src/services/` - API service layer (farmerService, plantationService)
- `src/lib/` - Library configurations (Supabase client)
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `src/assets/` - Static assets (images, icons)

## Database Structure (Supabase)

### farmers table
- id (UUID, Primary Key)
- name, age, photo, address, phone
- experience (years), land_size (hectares)
- tobacco_variety, certifications (array)

### plantations table
- id (UUID, Primary Key)
- farmer_id (Foreign Key to farmers)
- location, size, tobacco_variety
- planting_date, expected_harvest_date
- status ('planting' | 'growing' | 'harvesting' | 'harvested')
- soil_type, irrigation_type

## Development Guidelines
- Use functional components with React hooks
- Follow TypeScript best practices
- Use Tailwind CSS for styling with Ant Design components
- Keep components modular and reusable
- Focus on farmer profiles and plantation information display
- All data operations go through service layer
- Use custom hooks for data fetching and state management
- Handle loading and error states in all components

## Supabase Integration
- Supabase client is configured in `src/lib/supabase.ts`
- Services provide CRUD operations: `farmerService`, `plantationService`
- Custom hooks handle data fetching: `useFarmers`, `usePlantations`
- Environment variables in `.env` file (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

## Key Features
- Real-time data from Supabase
- Search and filter functionality
- Responsive design for all devices
- Loading states and error handling
- Type-safe API calls with TypeScript
