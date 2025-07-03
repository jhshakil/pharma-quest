import type { Country, GameState } from "@/types/game";

const STORAGE_KEY = "pharmaquest_game_state";

export const getInitialGameState = (): GameState => {
  const countries: Country[] = [
    {
      id: "bangladesh",
      name: "Bangladesh",
      unlocked: true,
      completed: false,
      position: { x: 75, y: 35 },
    },
    {
      id: "japan",
      name: "Japan",
      unlocked: false,
      completed: false,
      position: { x: 90, y: 25 },
    },
    {
      id: "australia",
      name: "Australia",
      unlocked: false,
      completed: false,
      position: { x: 90, y: 60 },
    },
    {
      id: "sweden",
      name: "Sweden",
      unlocked: false,
      completed: false,
      position: { x: 52, y: 18 },
    },
    {
      id: "spain",
      name: "Spain",
      unlocked: false,
      completed: false,
      position: { x: 50, y: 22 },
    },
    {
      id: "england",
      name: "England",
      unlocked: false,
      completed: false,
      position: { x: 47, y: 26 },
    },
  ];

  return {
    countries,
    totalScore: 0,
  };
};

export const saveGameState = (gameState: GameState): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }
};

export const loadGameState = (): GameState | null => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Error loading game state:", error);
        return null;
      }
    }
  }
  return null;
};

export const clearGameState = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
};
