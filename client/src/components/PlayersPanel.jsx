import { Brush, Crown } from "lucide-react";
import { useStore } from "../store/store";

function PlayerCard({ place, name, score, isDrawing, playerId, isOwner }) {
  const { mySocketId } = useStore();

  return (
    <div className="p-2 rounded-lg bg-zinc-600 flex flex-col mr-1">
      <div className="flex gap-3 font-semibold ">
        <div>#{place}</div>
        <div
          className={`text-lg ${mySocketId === playerId && "text-blue-400"}`}
          title={name}
        >
          {name.length > 10 ? name.substring(0, 10) + "..." : name}
        </div>
      </div>
      <div className="flex justify-between">
        <div>{score} pts</div>
        <div className="flex gap-2">
          { isOwner && (
            <div>
              <Crown size={20} />
            </div>
          )}
          {isDrawing && (
            <div>
              <Brush size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlayersPanel() {
  const { players, drawerId, ownerId } = useStore();

  return (
    <div className="w-[200px] overflow-hidden max-h-[600px] flex-shrink-0 bg-zinc-700 rounded-lg p-3 h-full">
      <div className="overflow-y-scroll flex flex-col gap-3 max-h-[576px]">
        {players.map((item, index) => (
          <PlayerCard
            key={item.playerId}
            playerId={item.playerId}
            place={index + 1}
            name={item.name}
            score={item.score}
            isDrawing={drawerId === item.playerId}
            isOwner={item.playerId === ownerId}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayersPanel;
