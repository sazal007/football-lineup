# Football Lineup Builder

## Features

- Interactive football pitch visualization
- Drag-and-drop player positioning
- Lineup management

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── common/        # Shared components
│   └── pitch/         # Pitch-related components
├── features/          # Feature-specific components
│   ├── lineup/        # Lineup management
│   └── pitch/         # Pitch visualization
├── utils/             # Utility functions
└── data/             # Static data and configurations
```

## Getting Started

1. Clone the repository

```bash
git clone [git@github.com:sazal007/football-lineup.git]
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

The application is built using Vite for fast development and optimal performance. The main features are organized in the `features` directory, while reusable components are stored in the `components` directory.
