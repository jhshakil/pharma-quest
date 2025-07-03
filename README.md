# PharmaQuest - Geography-Based Educational Game [Live Link](https://pharma-quest-khaki.vercel.app/)

PharmaQuest is an interactive web-based game that combines geography exploration with medicine-related educational content. Players explore a world map, visit different countries, and solve location-specific medical challenges to unlock new regions and earn points.

## 🎮 Game Overview

### Theme

PharmaQuest focuses on medicines, diseases, and global health. Players start their journey in Bangladesh and progressively unlock other countries by completing medical quizzes with at least 80% accuracy.

### Countries Available

- Bangladesh (Starting country)
- Japan
- Australia
- Sweden
- Spain
- England

### Game Flow

1. **Homepage**: Welcome screen with game instructions and name entry
2. **Game Screen**: Interactive world map with country pins
3. **Quiz System**: 5 multiple-choice questions per country
4. **Scoring**: 5 points per correct answer, 80% required to complete
5. **Progression**: Unlock new countries after completing current ones
6. **Game Over**: Final results and achievement summary

## 🚀 Features

- **Interactive World Map**: Visual representation with country pins
- **Progressive Unlocking**: Countries unlock as you complete quizzes
- **Educational Content**: Medicine and health-related questions
- **Score Tracking**: Points system with progress visualization
- **Local Storage**: Game progress saved automatically
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 🛠️ Technologies Used

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Storage**: Browser Local Storage
- **State Management**: React useState and useEffect

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd pharma-quest
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🎯 How to Play

1. **Start**: Click "Start Your Adventure" on the homepage
2. **Enter Name**: Provide your name to begin the game
3. **Explore Map**: Click on unlocked countries (Bangladesh starts unlocked)
4. **Take Quiz**: Answer 5 multiple-choice questions about medicine and health
5. **Score Points**: Earn 5 points for each correct answer
6. **Complete Country**: Achieve 80% or higher to unlock new countries
7. **Progress**: Continue until all countries are completed

## 🧠 Quiz Content

Each country features 5 carefully crafted questions covering:

- **Bangladesh**: Tropical diseases, malnutrition, infectious diseases
- **Japan**: Healthcare system, traditional medicine, aging population
- **Australia**: Medicare system, venomous creatures, skin cancer prevention
- **Sweden**: Universal healthcare, antibiotic stewardship, mental health
- **Spain**: National health system, cardiovascular prevention, pharmacy services
- **England**: NHS system, NICE guidelines, primary care model

## 💾 Data Storage

Game progress is automatically saved to browser Local Storage:

- Player name and current score
- Country completion status
- Best scores for each country
- Overall game progression

## 🔧 Customization

### Adding New Countries

1. Update the `countries` array in `lib/game-storage.ts`
2. Add quiz questions in `lib/quiz-data.ts`
3. Position the country on the map in `components/WorldMap.tsx`

### Modifying Quiz Questions

Edit the `quizData` object in `lib/quiz-data.ts` to add, remove, or modify questions for any country.

### Styling Changes

The project uses Tailwind CSS. Modify classes in components or extend the theme in `index.css`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## 🎯 Future Enhancements

- **Multiplayer Mode**: Compete with friends
- **More Countries**: Expand to all continents
- **Difficulty Levels**: Easy, Medium, Hard quiz modes
- **Achievements System**: Badges and rewards
- **Leaderboards**: Global and local high scores
- **Audio Effects**: Sound feedback for interactions
- **Animations**: Enhanced visual effects
- **Mobile App**: React Native version

---

**Happy Learning and Exploring! 🌍💊**

Embark on your PharmaQuest adventure and discover the fascinating world of global medicine and healthcare systems!
