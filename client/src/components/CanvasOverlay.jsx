import { useStore } from "../store/store";
import { socket } from "../utils/socket";

export function PreGameContent() {
  const { ownerId, mySocketId, myRoomId } = useStore();

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
          Start Game
        </button>
      ) : (
        <div>Waiting for game to start</div>
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
    chooseTime
  } = useStore();

  const handleClick = (word) => {
    socket.emit("receive-word", { word, roomId: myRoomId });
    setCurrentWord(word);
  };

  return (
    <div>
      {drawerId === mySocketId ? (
        <div className="z-20 flex flex-col gap-4 text-xl items-center">
          <div>Choose a word...</div>
          <div className="flex gap-2">
            {wordOptions.map(
              (
                item // !
              ) => (
                <button
                  onClick={() => handleClick(item)}
                  key={item}
                  className="p-2 shadow-lg border-zinc-600 bg-zinc-700 border-2 rounded-lg hover:border-zinc-500"
                >
                  {item}
                </button>
              )
            )}
          </div>
          <div>{chooseTime}</div>
        </div>
      ) : (
        <div className="z-20 text-xl">{drawerName} is choosing a word...</div>
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
  return (
    <div className="flex flex-col gap-5 text-lg text-center">
      <div>
        <div>#1 Barni</div>
        <div>#2 Alex</div>
        <div>#2 Peti</div>
      </div>
      <button className="p-2 shadow-lg border-zinc-600 bg-zinc-700 border-2 rounded-lg hover:border-zinc-500">
        Play Again
      </button>
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
