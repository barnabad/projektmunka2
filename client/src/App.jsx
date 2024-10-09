import { useState } from "react";
import { socket } from "./utils/socket";
import GameWrapper from "./components/GameWrapper";
import LandingPage from "./components/LandingPage";

function App() {
  const [isInGame, setIsInGame] = useState(false);

  return (
    <div className="bg-zinc-900 flex-grow flex text-white items-center justify-center">
      {isInGame ? <GameWrapper /> : <LandingPage />}
    </div>
  );
}

export default App;
