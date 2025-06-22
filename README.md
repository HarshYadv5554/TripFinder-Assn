# StayFinder

A modern property booking platform built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

- 🔍 Property search with filters (location, price, amenities, property type, etc.)
- 🏠 Property detail pages with image galleries and amenities
- 🗓️ Booking system with check-in/check-out and guest selection
- ✅ Booking confirmation message (even if database is unavailable)
- 🔒 Authentication (register, login, logout) via Supabase
- 👤 Host dashboard for managing listings and bookings
- 🎨 Responsive, modern UI with Tailwind CSS

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/HarshYadv5554/TripFinder-Assn.git
cd TripFinder-Assn/project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the `project` directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Start the development server
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Supabase Database Setup
- Ensure you have a `bookings` table in your Supabase project with the following columns:
  - `id` (uuid, primary key, default uuid_generate_v4())
  - `propertyId` (text)
  - `userId` (text)
  - `checkIn` (timestamp)
  - `checkOut` (timestamp)
  - `guests` (integer)
  - `totalPrice` (integer)
  - `status` (text)
  - `bookingDate` (timestamp)

## Notes
- If the database is unavailable, users will still see a booking confirmation message.
- For full booking persistence, ensure your Supabase table matches the expected schema.

## License
MIT 