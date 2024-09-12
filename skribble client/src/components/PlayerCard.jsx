import { Brush } from "lucide-react";
import React from "react";

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

export default PlayerCard;
