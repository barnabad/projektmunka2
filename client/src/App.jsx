import { socket } from "./utils/socket";
import GameWrapper from "./components/GameWrapper";
import LandingPage from "./components/LandingPage";
import { useStore } from "./store/store";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const {
    myRoomId,
    setMyRoomId,
    mySocketId,
    setMySocketId,
    setOwnerId,
    setPlayers,
  } = useStore();

  useEffect(() => {
    socket.on("connect", () => setMySocketId(socket.id));
    socket.on("join-successful", ({ roomCode, ownerId }) => {
      setMyRoomId(roomCode);
      setOwnerId(ownerId);
      console.log("join success");
    });

    socket.on("updated-players", (players) => setPlayers(players));

    return () => {
      socket.off("connect");
      socket.off("join-successful");
      socket.off("updated-players");
    };
  }, []);

  useEffect(() => {
    console.log(mySocketId);
  }, [mySocketId]);

  return (
    <>
      <div className="bg-zinc-900 flex-grow flex text-white items-center justify-center">
        {myRoomId ? <GameWrapper /> : <LandingPage />}
      </div>
      <Toaster />
    </>
  );
}

export default App;
