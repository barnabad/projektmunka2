import React from "react";
import PlayerCard from "./PlayerCard";
import useStore from "../store";

function PlayersPanel() {
  const { players } = useStore();

  return (
    <div className="w-[200px] overflow-hidden max-h-[600px] flex-shrink-0 bg-zinc-700 rounded-lg p-3 h-full">
      <div className="overflow-y-scroll flex flex-col gap-3 max-h-[576px]">
        {players.map((item, index) => (
          <PlayerCard
            key={index}
            place={index + 1}
            name={item.name}
            score={item.score}
            isDrawing={item.isDrawing}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayersPanel;
