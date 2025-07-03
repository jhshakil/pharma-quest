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

type TState = {
  playerName: string;
  gameState: GameState | null;
  selectedCountry: Country | null;
  showQuiz: boolean;
  showLockedModal: boolean;
  showCongratulations: boolean;
};

const Game = () => {
  const [mainState, setMainState] = useState<TState>({
    playerName: "",
    gameState: null,
    selectedCountry: null,
    showQuiz: false,
    showLockedModal: false,
    showCongratulations: false,
  });

  const navigate = useNavigate();

  // Handler functions for modal visibility
  const handleQuizDialogOpenChange = (open: boolean) => {
    setMainState((prev) => ({ ...prev, showQuiz: open }));
  };

  const handleLockedModalOpenChange = (open: boolean) => {
    setMainState((prev) => ({ ...prev, showLockedModal: open }));
  };

  const handleCongratulationsModalOpenChange = (open: boolean) => {
    setMainState((prev) => ({ ...prev, showCongratulations: open }));
  };

  useEffect(() => {
    const name = localStorage.getItem("pharmaquest_player");
    if (!name) {
      navigate("/");
      return;
    }

    const savedState = loadGameState();
    if (savedState) {
      setMainState((prev) => ({
        ...prev,
        playerName: name,
        gameState: savedState,
      }));
    } else {
      const initialState = getInitialGameState();
      setMainState((prev) => ({
        ...prev,
        playerName: name,
        gameState: initialState,
      }));
      saveGameState(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountryClick = (country: Country) => {
    if (!mainState.gameState) return;

    if (!country.unlocked) {
      setMainState((prev) => ({
        ...prev,
        selectedCountry: country,
        showLockedModal: true,
      }));
      return;
    }

    setMainState((prev) => ({
      ...prev,
      selectedCountry: country,
      showQuiz: true,
    }));
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    if (!mainState.gameState || !mainState.selectedCountry) return;

    const percentage = (score / (totalQuestions * 5)) * 100;
    const passed = percentage >= 80;

    const updatedCountries = mainState.gameState.countries.map((country) => {
      if (country.id === mainState.selectedCountry?.id) {
        return {
          ...country,
          completed: passed,
          bestScore: Math.max(country.bestScore || 0, score),
        };
      }
      return country;
    });

    const newGameState = {
      ...mainState.gameState,
      countries: updatedCountries,
      totalScore: mainState.gameState.totalScore + score,
    };

    setMainState((prev) => ({
      ...prev,
      gameState: newGameState,
      showQuiz: false,
    }));
    saveGameState(newGameState);

    if (passed) {
      const completedCount = updatedCountries.filter((c) => c.completed).length;
      if (completedCount === updatedCountries.length) {
        navigate("/game-over");
      } else {
        setMainState((prev) => ({
          ...prev,
          showCongratulations: true,
        }));
      }
    } else {
      alert("Please achieve 80% to unlock new countries");
    }
  };

  const handleUnlockCountry = (countryId: string) => {
    if (!mainState.gameState) return;

    const updatedCountries = mainState.gameState.countries.map((country) => {
      if (country.id === countryId) {
        return { ...country, unlocked: true };
      }
      return country;
    });

    const newGameState = {
      ...mainState.gameState,
      countries: updatedCountries,
    };

    setMainState((prev) => ({
      ...prev,
      gameState: newGameState,
      showCongratulations: false,
    }));
    saveGameState(newGameState);
  };

  if (!mainState.gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  const completedCountries = mainState.gameState.countries.filter(
    (c) => c.completed
  );
  const unlockedCountries = mainState.gameState.countries.filter(
    (c) => c.unlocked && !c.completed
  );

  const availableCountries = mainState.gameState.countries.filter(
    (c) => !c.unlocked && !c.completed
  );

  return (
    <main>
      <div className="bg-white border-b py-5 shadow-md">
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
              <span className="text-xl">{mainState.playerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-primary" />
              <span className="text-xl">
                {mainState.gameState.totalScore} pts
              </span>
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
              <span>{completedCountries.length}/6</span>
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
              countries={mainState.gameState.countries}
              onCountryClick={handleCountryClick}
            />
          </div>
        </div>
      </div>

      {mainState.selectedCountry && (
        <>
          <QuizDialog
            country={mainState.selectedCountry}
            onComplete={handleQuizComplete}
            open={mainState.showQuiz}
            setOpen={handleQuizDialogOpenChange}
          />
          <LockedModal
            country={mainState.selectedCountry}
            open={mainState.showLockedModal}
            setOpen={handleLockedModalOpenChange}
          />
        </>
      )}
      <CongratulationsModal
        availableCountries={availableCountries}
        onUnlockCountry={handleUnlockCountry}
        open={mainState.showCongratulations}
        setOpen={handleCongratulationsModalOpenChange}
      />
    </main>
  );
};

export default Game;
