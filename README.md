# CampusConnect

![CampusConnect Logo](public/placeholder-logo.png)

CampusConnect is an AI-powered platform designed to help students find their ideal college and course matches. It leverages advanced recommendation algorithms, real-time cutoff predictions, and a user-friendly interface to simplify the college admissions process.

## Features

- **AI-Powered College Recommendations**: Personalized suggestions based on your academic profile, preferences, and career goals.
- **Cutoff Predictions**: Get real-time predictions for college cutoffs to make informed decisions.
- **Multi-Language Support**: Use the platform in English, Tamil, or Hindi.
- **Interactive Chatbot**: 24/7 support to answer your queries about colleges, courses, and admissions.
- **Profile Builder**: Step-by-step onboarding to capture your academic, personal, and extracurricular details.
- **College Comparison**: Compare colleges side-by-side on various parameters.
- **Dashboard & Analytics**: Visualize your matches, preferences, and application progress.
- **PDF Reports**: Generate and download detailed reports of your recommendations.
- **Modern UI/UX**: Responsive, accessible, and visually appealing design with light/dark mode.

## Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS, custom CSS variables for light/dark themes
- **State Management**: React Context API
- **UI Components**: Radix UI, custom components
- **Data Visualization**: Recharts
- **Other Libraries**: Framer Motion, Swiper, Zod, React Hook Form

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm, npm, or yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd campusconnect

# Install dependencies
pnpm install # or npm install or yarn install
```

### Running the App
```bash
# Start the development server
pnpm dev # or npm run dev or yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production
```bash
pnpm build # or npm run build or yarn build
pnpm start # or npm start or yarn start
```

## Project Structure
- `app/` - Main application pages and routes
- `components/` - Reusable UI components
- `contexts/` - React context providers (auth, language, theme)
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and libraries
- `public/` - Static assets (images, logos)
- `styles/` - Global and component styles

## Color Palette
CampusConnect uses a modern, accessible color palette with support for light and dark modes. Key colors include:
- **Light Mode**: White backgrounds, dark text, blue/purple gradients for accents
- **Dark Mode**: Dark backgrounds, light text, blue/purple gradients for accents

## Mission & Vision
> To democratize access to quality education by providing AI-powered guidance that helps every student find their perfect college match.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE) 