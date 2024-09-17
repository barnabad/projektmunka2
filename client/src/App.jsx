import React from "react";
import GameWrapper from "./components/GameWrapper";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="bg-zinc-900 flex-grow flex text-white items-center justify-center">
      { /*<GameWrapper />*/}
      { <LandingPage /> }
    </div>
  );
}

export default App;
