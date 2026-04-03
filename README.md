# Educational Web App

An interactive educational web application built with React and Tailwind CSS.

## Features

- 🏠 **Home** - Welcome dashboard with interactive chat
- 📚 **Learn** - Learning modules with different difficulty levels
- ✏️ **Practice** - Quiz and practice exercises
- 📊 **Progress** - Track your learning progress and achievements

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd educational-web-app
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing

## Project Structure

```
educational-web-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Custom styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Customization

The app is ready for you to add your specific educational features. You can:

1. Add new tabs in the `tabs` array in `App.jsx`
2. Modify the color scheme in `tailwind.config.js`
3. Add new components in the `src` directory
4. Integrate with backend APIs as needed

## Notes

- The app is fully responsive (mobile-friendly)
- Includes a mobile navigation bar at the bottom
- Uses modern React hooks (useState)
- Follows React best practices
