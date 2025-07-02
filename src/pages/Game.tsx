import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WorldMap from "@/components/WorldMap";
import { cn } from "@/lib/utils";
import { ArrowLeft, Trophy, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Game = () => {
  const [playerName, setPlayerName] = useState("");
  const [progress, setProgress] = useState(13);

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("pharmaquest_player");
    if (!name) {
      navigate("/");
      return;
    }
    setPlayerName(name);
  }, []);

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
            <Progress value={progress} />
          </div>
          <div>
            <p>Available Countries</p>
            <div className="flex flex-col [&>div]:py-2 mt-2 divide-y">
              <div className="flex justify-between items-center">
                <span>Bangladesh</span>
                <Button size={"sm"} variant={"outline"} className="h-7">
                  Ready
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Bangladesh</span>
                <Button size={"sm"} variant={"outline"} className="h-7">
                  Ready
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 bg-white py-4 px-5 rounded-lg shadow-xl">
          <h3 className="text-xl">World Map - Choose Your Destination</h3>
          <div className="mt-8 rounded-lg overflow-hidden">
            <WorldMap />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Game;
