import { socket } from "./utils/socket";
import GameWrapper from "./components/GameWrapper";
import LandingPage from "./components/LandingPage";
import { useStore } from "./store/store";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [bigTime, setBigTime] = useState(null);
  const [chooseTimeInterval, setChooseTimeInterval] = useState(null);

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
    setRound,
    setWordLength,
    setCurrentWord,
    decreaseChooseTime,
    setChooseTime,
    drawTime,
    setDrawTime,
    setDrawTimeLeft,
    decreaseDrawTimeLeft,
    setMaxRounds,
    addHint,
    resetHint,
    ctx,
    canvasHeight,
    canvasWidth,
    color,
    thickness,
    setIsDrawing,
    gameState,
  } = useStore();

  useEffect(() => {
    socket.connect();
  
    const checkSocketId = setInterval(() => {
      if (socket.id) {
        console.log("Retrying socket ID:", socket.id);
        setMySocketId(socket.id);
        clearInterval(checkSocketId);
      }
    }, 1000);
  
    socket.on("connect", () => {
      setMySocketId(socket.id);
      clearInterval(checkSocketId); // Clear interval once connected
    });
  
    return () => {
      clearInterval(checkSocketId);
      socket.disconnect();
      socket.off("connect");
    };
  }, [setMySocketId]);

  useEffect(() => {
    socket.on(
      "join-successful",
      ({ roomCode, ownerId, maxRound, drawTime }) => {
        setMyRoomId(roomCode);
        setOwnerId(ownerId);
        setDrawTime(drawTime);
        setMaxRounds(maxRound);
        console.log("join success");
        // hang ide
      }
    );
    socket.on("connect_error", () => toast.error("Connection error"));
    socket.on("error", (error) => toast.error(error));
    socket.on("updated-players", (players) => setPlayers(players));
    socket.on("new-message", (msgData) => {
      setChatMessages(msgData);
    });
    socket.on("start-round", (currentRound) => {
      setGameState("choosing");
      setRound(currentRound);
    });
    socket.on("choose-word", (words) => setWordOptions(words));
    socket.on("update-drawer", (data) => {
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.lineJoin = "round";
      }

      lastX = null;
      lastY = null;

      setDrawerId(data.drawerId);
      setDrawerName(data.drawerName);
      setIsDrawing(false);
      setGameState("choosing");
      setCurrentWord("");
      resetHint();
      setWordOptions([]);

      const intervalId = setInterval(() => {
        decreaseChooseTime();
      }, 1000);
      setChooseTimeInterval(intervalId);

      if (bigTime) {
        clearInterval(bigTime);
        setBigTime(null);
      }
      setDrawTimeLeft(drawTime);
    });
    socket.on("owner-change", (newOwnerId) => {
      setOwnerId(newOwnerId);
      console.log("New owner selected: ", newOwnerId);
    });
    socket.on("update-word-length", (length) => {
      setWordLength(length);
      setGameState("playing");

      if (chooseTimeInterval) {
        clearInterval(chooseTimeInterval);
        setChooseTimeInterval(null);
      }
      setChooseTime(15);

      setDrawTimeLeft(drawTime);

      const bigTimeId = setInterval(() => {
        decreaseDrawTimeLeft();
      }, 1000);
      setBigTime(bigTimeId);
    });

    socket.on("send-solution", (solution) => {
      setCurrentWord(solution);
    });

    socket.on("reveal-letter", (data) => {
      addHint(data);
    });

    socket.on("game-end", () => {
      setGameState("postGame");

      if (bigTime) {
        clearInterval(bigTime);
        setBigTime(null);
      }
    });

    let lastX = null;
    let lastY = null;

    // Listen for draw events from the server
    socket.on("drawing-data", ({ x, y, stroke, color }) => {
      if (gameState === "playing") {
        ctx.strokeStyle = color;
        ctx.lineWidth = stroke;

        // If it's the first point in a stroke, move to that position
        if (lastX === null || lastY === null) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else {
          // Otherwise, draw a line from the last position to the current position
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // Update last position
        lastX = x;
        lastY = y;
      }
    });

    // Reset the last position when the user lifts the pen
    socket.on("draw-end", () => {
      lastX = null;
      lastY = null;
    });

    socket.on("canvas-cleared", () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    });

    return () => {
      socket.off("connect_error");
      socket.off("error");
      socket.off("join-successful");
      socket.off("updated-players");
      socket.off("new-message");
      socket.off("start-round");
      socket.off("choose-word");
      socket.off("update-drawer");
      socket.off("owner-change");
      socket.off("update-word-length");
      socket.off("send-solution");
      socket.off("game-end");
      socket.off("drawing-data");
      socket.off("draw-end");
      socket.off("canvas-cleared");

      if (chooseTimeInterval) {
        clearInterval(chooseTimeInterval);
      }

      if (bigTime) {
        clearInterval(bigTime);
      }
    };
  }, [chooseTimeInterval, drawTime, bigTime]);

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
