export interface Country {
  id: string;
  name: string;
  unlocked: boolean;
  completed: boolean;
  position: { x: number; y: number };
  bestScore?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface GameState {
  countries: Country[];
  totalScore: number;
  currentCountry?: string;
}
