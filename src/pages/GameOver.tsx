import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clearGameState, loadGameState } from "@/lib/game-storage";
import type { GameState } from "@/types/game";
import { Globe, Home, RotateCcw, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const GameOver = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerName, setPlayerName] = useState("");
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
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayAgain = () => {
    clearGameState();
    navigate("/game");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const completedCountries = gameState.countries.filter((c) => c.completed);
  const completionPercentage =
    (completedCountries.length / gameState.countries.length) * 100;

  return (
    <div className="min-h-screen flex justify-center items-center my-8">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-4xl font-bold">
            Congratulations, {playerName}!
          </CardTitle>
          <p className="text-xl opacity-90">
            You've completed your PharmaQuest adventure!
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {completedCountries.length}
              </div>
              <p>Countries Completed</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Trophy className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-600 mb-2">
                {gameState.totalScore}
              </div>
              <p>Total Points</p>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <Star className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {Math.round(completionPercentage)}%
              </div>
              <p>Completion Rate</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">
              Your Journey Results
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {gameState.countries.map((country) => (
                <div
                  key={country.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border"
                >
                  <p className="font-medium">{country.name}</p>
                  <div className="flex items-center space-x-2">
                    {country.completed ? (
                      <>
                        <Badge className="bg-green-100 text-green-800">
                          {country.bestScore || 0} pts
                        </Badge>
                        <Badge className="bg-green-600 text-white">
                          Completed
                        </Badge>
                      </>
                    ) : (
                      <Badge className="bg-white text-gray-500 border border-border">
                        Not Completed
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handlePlayAgain}>
              <RotateCcw />
              Play Again
            </Button>

            <Button
              onClick={handleGoHome}
              variant="outline"
              className="flex items-center space-x-2 px-8 py-3 bg-transparent"
            >
              <Home />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameOver;
