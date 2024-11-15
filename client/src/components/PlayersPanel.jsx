import { Brush, Crown } from "lucide-react";
import { useStore } from "../store/store";

function PlayerCard({
  place,
  name,
  avatarUrl,
  score,
  isDrawing,
  playerId,
  isOwner,
}) {
  const { mySocketId } = useStore();

  return (
    <div className="p-2 rounded-lg bg-zinc-600 flex items-center justify-between mr-1 relative">
      <div>
        <div className="flex gap-3 font-semibold ">
          <div>#{place}</div>
          <div
            className={`text-lg ${mySocketId === playerId && "text-blue-400"}`}
            title={name}
          >
            {name.length > 12 ? name.substring(0, 12) + "..." : name}
          </div>
        </div>
        <div className="flex gap-2">
          <div>{score} pts</div>
          <div className="flex gap-2 items-center">
            {isOwner && (
              <div>
                <Crown size={18} />
              </div>
            )}
            {isDrawing && (
              <div>
                <Brush size={18} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <img className="size-14" src={avatarUrl}></img>
      </div>
    </div>
  );
}

function PlayersPanel() {
  const { players, drawerId, ownerId } = useStore();

  return (
    <div className="w-[275px] overflow-hidden max-h-[600px] flex-shrink-0 bg-zinc-700 rounded-lg p-3 h-full">
      <div className="overflow-y-scroll flex flex-col gap-3 max-h-[576px]">
        {players.map((item, index) => (
          <PlayerCard
            key={item.playerId}
            playerId={item.playerId}
            place={index + 1}
            name={item.name}
            avatarUrl={item.avatarUrl}
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
