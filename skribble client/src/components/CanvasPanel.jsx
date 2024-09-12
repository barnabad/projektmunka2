import CanvasOverlay from "./CanvasOverlay";
import { useState, useRef, useEffect } from "react";

function CanvasPanel() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseDown = (e) => {
    const mousePos = getMousePos(e);
    setLastPos(mousePos);
    setIsDrawing(true);
    console.log("drawing start at", mousePos);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const mousePos = getMousePos(e);
    console.log("drawing at", mousePos);
  };

  const handleMouseUp = (e) => {
    if (isDrawing) {
      setIsDrawing(false);
      const mousePos = getMousePos(e);
      console.log("drawing end at", mousePos);
    }
  };

  const handleMouseOut = (e) => {
    if (isDrawing) {
      setIsDrawing(false);
      const mousePos = getMousePos(e);
      console.log("drawing end at", mousePos);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 776;
    canvas.height = 576;

    const context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.lineCap = "round";

    // Attach event listeners directly to the canvas element
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseout", handleMouseOut);

    return () => {
      // Cleanup event listeners
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDrawing, lastPos]);

  return (
    <div className="w-[800px] h-[600px] relative flex flex-shrink-0 p-3 bg-zinc-700 rounded-lg">
      <canvas
        ref={canvasRef}
        width={776}
        height={576}
        className="bg-white w-full h-auto"
      ></canvas>

      {/* <CanvasOverlay isChoosing={true} /> */}
    </div>
  );
}

export default CanvasPanel;
