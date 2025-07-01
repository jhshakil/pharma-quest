import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Stethoscope } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const [playerName, setPlayerName] = useState(
    localStorage.getItem("pharmaquest_player") || ""
  );
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (playerName) {
      localStorage.setItem("pharmaquest_player", playerName);
      navigate("/game");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            <Stethoscope className="h-8 w-8" />
            <CardTitle className="text-4xl font-bold">PharmaQuest</CardTitle>
          </div>
          <CardDescription className="text-xl text-bold">
            Explore the world and solve medicine-related challenges across
            different countries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>How to Play</span>
            </h3>
            <ul className="space-y-2">
              <li>• Explore an interactive world map</li>
              <li>• Complete medicine-related quizzes in each country</li>
              <li>• Score at least 80% to unlock new countries</li>
              <li>• Earn 5 points for each correct answer</li>
              <li>• Start your journey in Bangladesh!</li>
            </ul>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label
                htmlFor="playerName"
                className="block text-sm font-medium  mb-2"
              >
                Enter your name to begin:
              </label>
              <Input
                id="playerName"
                type="text"
                placeholder="Your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
            <Button
              onClick={handleStartGame}
              disabled={!playerName.trim()}
              className="w-full h-12 text-xl font-bold"
            >
              Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
