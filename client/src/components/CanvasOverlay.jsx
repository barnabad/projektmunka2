import { useStore } from "../store/store";
import { socket } from "../utils/socket";
import { Trophy } from "lucide-react";

export function PreGameContent() {
  const { ownerId, mySocketId, myRoomId, language } = useStore();

  const handleStartGame = () => {
    socket.emit("start-game", myRoomId);
  };

  return (
    <div className="text-center text-xl">
      {mySocketId === ownerId ? (
        <button
          onClick={handleStartGame}
          className="p-2 shadow-lg border-zinc-600 bg-zinc-700 border-2 rounded-lg hover:border-zinc-500"
        >
          {language === "english" ? "Start Game" : "Játék indítása"}
        </button>
      ) : (
        <div>
          {language === "english"
            ? "Waiting for game to start"
            : "Várakozás a játék kezdésére"}
        </div>
      )}
    </div>
  );
}

export function ChooseWordContent() {
  const {
    mySocketId,
    myRoomId,
    wordOptions,
    drawerId,
    drawerName,
    setCurrentWord,
    chooseTime,
    language,
  } = useStore();

  const handleClick = (word) => {
    socket.emit("receive-word", { word, roomId: myRoomId });
    setCurrentWord(word);
  };

  return (
    <div>
      {drawerId === mySocketId ? (
        <div className="z-20 flex flex-col gap-4 text-xl items-center">
          <div>
            {language === "english"
              ? "Choose a word..."
              : "Válassz egy szót..."}
          </div>
          <div className="flex gap-2">
            {wordOptions.map(
              (
                item, // !
              ) => (
                <button
                  onClick={() => handleClick(item)}
                  key={item}
                  className="p-2 shadow-lg border-zinc-600 bg-zinc-700 border-2 rounded-lg hover:border-zinc-500"
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <div>{chooseTime}</div>
        </div>
      ) : (
        <div className="z-20 text-xl">
          {drawerName}{" "}
          {language === "english" ? "is choosing a word..." : "szót választ..."}
        </div>
      )}
    </div>
  );
}

export function RoundEndContent() {
  const round = 1;

  return (
    <div className="text-lg text-center">
      <div>Round {round}</div>
      <div className="flex gap-5 justify-between">
        <span>Barni</span>
        <span>23255</span>
      </div>
      <div className="flex gap-5 justify-between">
        <span>Alex</span>
        <span>152</span>
      </div>
      <div className="flex gap-5 justify-between">
        <span>Jakab</span>
        <span>50</span>
      </div>
      <div className="flex gap-5  justify-between">
        <span>Peti</span>
        <span>25</span>
      </div>
      <div className="flex gap-5 justify-between">
        <span>Marci</span>
        <span>0</span>
      </div>
    </div>
  );
}

export function PostGameContent() {
  const { mySocketId, ownerId, myRoomId, language, players } = useStore();

  const uniqueScores = new Set();
  players.forEach((player) => uniqueScores.add(player.score));
  const sortedScores = [...uniqueScores].sort((a, b) => b - a);
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const playAgain = () => {
    socket.emit("play-again", myRoomId);
  };

  return (
    <div className="flex flex-col gap-5 text-lg text-center">
      <div className="font-semibold">
        {language === "english" ? "Results..." : "Eredmények..."}
      </div>
      <div className="flex flex-col gap-2 z-40">
        {sortedPlayers.map((player) => (
          <div key={player.playerId} className="flex gap-2 justify-end">
            {player.score === sortedScores[0] && (
              <Trophy className="text-yellow-500" />
            )}
            {player.score === sortedScores[1] && (
              <Trophy className="text-gray-400" />
            )}
            {player.score === sortedScores[2] && (
              <Trophy className="text-orange-800" />
            )}
            <span>
              {player.name} - {player.score}
            </span>
          </div>
        ))}
      </div>
      {mySocketId === ownerId && (
        <button
          onClick={playAgain}
          className="p-2 shadow-lg border-zinc-600 bg-zinc-700 border-2 rounded-lg hover:border-zinc-500"
        >
          {language === "english" ? "Play Again" : "Új játék"}
        </button>
      )}
    </div>
  );
}

export function CanvasOverlay({ children }) {
  return (
    <div className="z-10 flex justify-center items-center absolute left-3 top-3 inset-3">
      <div className="bg-black opacity-65 absolute inset-0 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
