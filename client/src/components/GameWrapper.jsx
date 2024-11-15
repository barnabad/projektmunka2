import React from "react";
import TopPanel from "./TopPanel";
import PlayersPanel from "./PlayersPanel";
import CanvasPanel from "./CanvasPanel";
import ChatPanel from "./ChatPanel";
import BottomPanel from "./BottomPanel";

function GameWrapper() {
  return (
    <main className="flex flex-col gap-3 max-w-[1375px]">
      <TopPanel />
      <div className="flex gap-3 justify-between h-[600px]">
        <PlayersPanel />
        <CanvasPanel />
        <ChatPanel />
      </div>
      <BottomPanel allRounds={3} currentRound={1} />
    </main>
  );
}

export default GameWrapper;
