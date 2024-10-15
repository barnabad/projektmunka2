import { socket } from "./utils/socket";
import GameWrapper from "./components/GameWrapper";
import LandingPage from "./components/LandingPage";
import { useStore } from "./store/store";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const {
    myRoomId,
    setMyRoomId,
    setMySocketId,
    setOwnerId,
    setPlayers,
    setChatMessages,
    setGameState,
    setWordOptions,
    setDrawerId,
    setDrawerName,
  } = useStore();

  useEffect(() => {
    socket.on("connect", () => setMySocketId(socket.id));
    socket.on("join-successful", ({ roomCode, ownerId }) => {
      setMyRoomId(roomCode);
      setOwnerId(ownerId);
      console.log("join success");
    });
    socket.on("connect_error", () => toast.error("Connection error"));
    socket.on("error", (error) => toast.error(error));
    socket.on("updated-players", (players) => setPlayers(players));
    socket.on("new-message", (msgData) => {
      setChatMessages(msgData);
    });
    socket.on("start-round", () => setGameState("choosing"));
    socket.on("choose-word", (words) => setWordOptions(words));
    socket.on("update-drawer", (data) => {
      setDrawerId(data.drawerId);
      setDrawerName(data.drawerName);
    });
    socket.on("owner-change", (newOwnerId) => {
      setOwnerId(newOwnerId);
      console.log("New owner selected: ", newOwnerId);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("error");
      socket.off("join-successful");
      socket.off("updated-players");
      socket.off("new-message");
      socket.off("start-round");
      socket.off("choose-word");
      socket.off("update-drawer");
      socket.off("owner-change");
    };
  }, []);

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
