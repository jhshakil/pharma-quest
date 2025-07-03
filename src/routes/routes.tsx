import Game from "@/pages/Game";
import GameOver from "@/pages/GameOver";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/game-over",
    element: <GameOver />,
  },
]);

export default routes;
