import CongratulationsModal from "@/components/dialog/CongratulationsModal";
import LockedModal from "@/components/dialog/LockedModal";
import QuizDialog from "@/components/dialog/QuizDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WorldMap from "@/components/WorldMap";
import {
  getInitialGameState,
  loadGameState,
  saveGameState,
} from "@/lib/game-storage";
import { cn } from "@/lib/utils";
import type { Country, GameState } from "@/types/game";
import { ArrowLeft, Trophy, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Game = () => {
  const [playerName, setPlayerName] = useState("");
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("pharmaquest_player");
    if (!name) {
      navigate("/");
      return;
    }
    setPlayerName(name);

    const savedState = loadGameState();
    if (savedState) {
      setGameState(savedState);
    } else {
      const initialState = getInitialGameState();
      setGameState(initialState);
      saveGameState(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountryClick = (country: Country) => {
    if (!gameState) return;

    if (!country.unlocked) {
      setSelectedCountry(country);
      setShowLockedModal(true);
      return;
    }

    if (country.completed) {
      // Allow retaking completed quizzes
      setSelectedCountry(country);
      setShowQuiz(true);
      return;
    }

    setSelectedCountry(country);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    if (!gameState || !selectedCountry) return;

    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 80;

    const updatedCountries = gameState.countries.map((country) => {
      if (country.id === selectedCountry.id) {
        return {
          ...country,
          completed: passed,
          bestScore: Math.max(country.bestScore || 0, score),
        };
      }
      return country;
    });

    const newGameState = {
      ...gameState,
      countries: updatedCountries,
      totalScore: gameState.totalScore + score,
    };

    setGameState(newGameState);
    saveGameState(newGameState);
    setShowQuiz(false);

    if (passed) {
      const completedCount = updatedCountries.filter((c) => c.completed).length;
      if (completedCount === updatedCountries.length) {
        navigate("/game-over");
      } else {
        setShowCongratulations(true);
      }
    }
  };

  const handleUnlockCountry = (countryId: string) => {
    if (!gameState) return;

    const updatedCountries = gameState.countries.map((country) => {
      if (country.id === countryId) {
        return { ...country, unlocked: true };
      }
      return country;
    });

    const newGameState = {
      ...gameState,
      countries: updatedCountries,
    };

    setGameState(newGameState);
    saveGameState(newGameState);
    setShowCongratulations(false);
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  const completedCountries = gameState.countries.filter((c) => c.completed);
  const unlockedCountries = gameState.countries.filter(
    (c) => c.unlocked && !c.completed
  );

  console.log(unlockedCountries);
  console.log(gameState);

  return (
    <main>
      <div className=" bg-white border-b py-5 shadow-md">
        <div className="container mx-auto px-8 flex justify-between items-center gap-11 bg-white">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({ variant: "link" }),
              "hover:no-underline text-text hover:text-primary text-md"
            )}
          >
            <ArrowLeft /> Home
          </Link>
          <div className="flex items-center gap-11">
            <div className="flex items-center gap-2">
              <User size={20} className="text-primary" />
              <span className="text-xl">{playerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-primary" />
              <span className="text-xl">10</span>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-7 container mx-auto px-8 mt-8">
        <div className="bg-white py-4 px-5 rounded-lg shadow-xl flex flex-col gap-3">
          <h3 className="text-xl">Your Progress</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center mb-2">
              <span>Countries Completed</span>
              <span>0/6</span>
            </div>
            <Progress value={(completedCountries.length / 6) * 100} />
          </div>
          <div>
            <p>Available Countries</p>
            <div className="flex flex-col [&>div]:py-2 mt-2 divide-y">
              {unlockedCountries.map((country) => (
                <div
                  key={country.id}
                  className="flex justify-between items-center"
                >
                  <span>{country.name}</span>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    className="h-7"
                    onClick={() => handleCountryClick(country)}
                  >
                    Ready
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p>Completed Countries</p>
            <div className="flex flex-col [&>div]:py-2 mt-2 divide-y">
              {completedCountries.map((country) => (
                <div
                  key={country.id}
                  className="flex justify-between items-center"
                >
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 bg-white py-4 px-5 rounded-lg shadow-xl">
          <h3 className="text-xl">World Map - Choose Your Destination</h3>
          <div className="mt-8 rounded-lg overflow-hidden">
            <WorldMap
              countries={gameState?.countries as Country[]}
              onCountryClick={handleCountryClick}
            />
          </div>
        </div>
      </div>

      {selectedCountry && (
        <>
          <QuizDialog
            country={selectedCountry}
            onComplete={handleQuizComplete}
            open={showQuiz}
            setOpen={setShowQuiz}
          />
          <LockedModal
            country={selectedCountry}
            open={showLockedModal}
            setOpen={setShowLockedModal}
          />
        </>
      )}

      <CongratulationsModal
        availableCountries={gameState.countries.filter(
          (c) => !c.unlocked && !c.completed
        )}
        onUnlockCountry={handleUnlockCountry}
        open={showCongratulations}
        setOpen={setShowCongratulations}
      />
    </main>
  );
};

export default Game;
