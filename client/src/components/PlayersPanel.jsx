import React from "react";
import { players } from "../../testData";
import { Brush } from "lucide-react";

function PlayerCard({ place, name, score, isDrawing }) {
  return (
    <div className="p-2 rounded-lg bg-zinc-600 flex flex-col mr-1">
      <div className="flex gap-3 font-semibold ">
        <div>#{place}</div>
        <div className="text-lg">{name}</div>
      </div>
      <div className="flex justify-between">
        <div>{score} pts</div>
        {isDrawing && (
          <div>
            <Brush size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

function PlayersPanel() {
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
