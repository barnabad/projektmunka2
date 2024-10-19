import {
  CanvasOverlay,
  ChooseWordContent,
  PostGameContent,
  PreGameContent,
  RoundEndContent,
} from "./CanvasOverlay";
import { useStore } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket";

function CanvasPanel() {
  const [isDrawing, setIsDrawing] = useState(false);

  const {
    gameState,
    setCanvasWidth,
    setCanvasHeight,
    ctx,
    setCtx,
    color,
    thickness,
    mySocketId,
    drawerId,
    myRoomId,
  } = useStore();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);
    canvas.width = 776;
    canvas.height = 576;

    setCanvasHeight(canvas.height);
    setCanvasWidth(canvas.width);

    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = 8;
  }, []);

  useEffect(() => {
    if (ctx) ctx.strokeStyle = color;
  }, [color]);

  useEffect(() => {
    if (ctx) ctx.lineWidth = thickness;
  }, [thickness]);

  const renderContent = () => {
    switch (gameState) {
      case "preGame":
        return <PreGameContent />;
      case "choosing":
        return <ChooseWordContent />;
      case "roundEnd":
        return <RoundEndContent />;
      case "postGame":
        return <PostGameContent />;
      default:
        return null;
    }
  };

  const startDrawing = (e) => {
    if (mySocketId === drawerId) {
      setIsDrawing(true);
      draw(e);
    }
  };

  const finishDrawing = () => {
    if (mySocketId === drawerId) {
      setIsDrawing(false);
      ctx.beginPath();
      socket.emit("draw-end", myRoomId);
    }
  };

  const draw = (e) => {
    if (mySocketId !== drawerId) return;
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Log pixel data
    const data = {
      x: x,
      y: y,
      stroke: thickness[0],
      color: color,
    };
    socket.emit("new-canvas-data", { roomId: myRoomId, data });
  };

  return (
    <div className="w-[800px] h-[600px] relative flex flex-shrink-0 p-3 bg-zinc-700 rounded-lg">
      <canvas
        ref={canvasRef}
        width={776}
        height={576}
        className="bg-white w-full h-auto"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
      ></canvas>

      {gameState !== "playing" && (
        <CanvasOverlay>{renderContent()}</CanvasOverlay>
      )}
    </div>
  );
}

export default CanvasPanel;
