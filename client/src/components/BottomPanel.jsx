import { CircleDot, Eraser, PaintBucket, Pencil, Trash2 } from "lucide-react";
import { useStore } from "../store/store";
import * as Slider from "@radix-ui/react-slider";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

const colorNames = [
  [
    "#ffffff", // white
    "#9ca3af", // gray-400
    "#f87171", // red-400
    "#fb923c", // orange-400
    "#facc15", // yellow-400
    "#4ade80", // green-400
    "#38bdf8", // sky-400
    "#60a5fa", // blue-400
    "#a78bfa", // purple-400
    "#f472b6", // pink-400
    "#c2410c", // orange-700
  ],
  [
    "#000000", // black
    "#374151", // gray-700
    "#ff0000",
    "#f97316", // orange-500
    "#ca8a04", // yellow-600
    "#008000", // green-950
    "#0c4a6e", // sky-900
    "#1e3a8a", // blue-950
    "#581c87", // purple-950
    "#831843", // pink-900
    "#7c2d12", // orange-950
  ],
];

function ColorBlock({ color, setColor, setLastColor }) {
  return (
    <div
      className="w-[25px]"
      style={{ backgroundColor: color }}
      data-color={color}
      onClick={(e) => {
        setColor(e.target.dataset.color);
        setLastColor(e.target.dataset.color);
      }}
    ></div>
  );
}

function ThicknessSlider() {
  const { thickness, setThickness } = useStore();

  const handleThicknessChange = (value) => {
    console.log("thickness changed", value);
    setThickness(value);
  };

  return (
    <form className="ml-5">
      <Slider.Root
        onValueChange={handleThicknessChange}
        className="relative flex h-5 w-[200px] touch-none select-none items-center"
        value={[thickness]}
        min={5}
        max={50}
        step={1}
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-zinc-500">
          <Slider.Range className="absolute h-full rounded-full bg-white" />
        </Slider.Track>
        <Slider.Thumb
          className="block size-4 rounded-[10px] bg-white focus:outline-none"
          aria-label="Volume"
        />
      </Slider.Root>
    </form>
  );
}

function BottomPanel() {
  const {
    round,
    maxRounds,
    ctx,
    canvasHeight,
    canvasWidth,
    color,
    setColor,
    thickness,
    mySocketId,
    drawerId,
    gameState
  } = useStore();

  const [isDrawTool, setIsDrawTool] = useState(true);
  const [lastColor, setLastColor] = useState(color);

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  };

  return (
    <div className="rounded-lg bg-zinc-700 flex gap-3">
      <div className="w-[200px] p-3 text-xl flex justify-center items-center font-semibold">
        {`Round ${round} of ${maxRounds}`}
      </div>
      {(mySocketId === drawerId && gameState === "playing") && (
        <div className="flex-grow p-3 gap-3 flex justify-center items-center">
          <div
            className="w-[54px] h-[54px] rounded-lg border-2 border-zinc-600"
            style={{ backgroundColor: !isDrawTool ? lastColor : color }}
          ></div>
          <div className="border-2 border-zinc-600 rounded-lg overflow-hidden cursor-pointer">
            <div className="h-[25px] flex">
              {colorNames[0].map((item) => (
                <ColorBlock
                  key={item}
                  color={item}
                  setColor={setColor}
                  setLastColor={setLastColor}
                />
              ))}
            </div>
            <div className="h-[25px] flex">
              {colorNames[1].map((item) => (
                <ColorBlock
                  key={item}
                  color={item}
                  setColor={setColor}
                  setLastColor={setLastColor}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-1">
            <div
              onClick={() => {
                setIsDrawTool(true);
                setColor(lastColor);
              }}
              className={`shadow-lg border-2 ${
                isDrawTool && "bg-zinc-500"
              } rounded-lg border-zinc-600 p-2 cursor-pointer hover:border-zinc-500`}
            >
              <Pencil size={34} />
            </div>
            {/* <div className="shadow-lg border-2 rounded-lg border-zinc-600 p-2 cursor-pointer hover:border-zinc-500">
            <PaintBucket size={34} />
          </div> */}
            <div
              onClick={() => {
                setIsDrawTool(false);
                setColor("#FFFFFF");
              }}
              className={`shadow-lg border-2 ${
                !isDrawTool && "bg-zinc-500"
              } rounded-lg border-zinc-600 p-2 cursor-pointer hover:border-zinc-500`}
            >
              <Eraser size={34} />
            </div>

            <Popover.Root>
              <Popover.Trigger>
                <div className="shadow-lg border-2 rounded-lg border-zinc-600 p-2 cursor-pointer hover:border-zinc-500">
                  <CircleDot size={34} />
                </div>
              </Popover.Trigger>
              <Popover.Content sideOffset={8}>
                <div className="p-2 bg-zinc-700 rounded-md border-2 border-zinc-500 flex gap-2 items-center">
                  <ThicknessSlider />
                  <span className="w-[40px]">{thickness}px</span>
                </div>
              </Popover.Content>
            </Popover.Root>

            <div
              onClick={clearCanvas}
              className="shadow-lg border-2 rounded-lg hover:border-zinc-500 border-zinc-600 p-2 cursor-pointer"
            >
              <Trash2 size={34} />
            </div>
          </div>
        </div>
      )}
      <div className="ml-auto w-[275px] p-3 flex items-center justify-center flex-col gap-2">
        <div>[ Verzio X - 2024.XX.XX ]</div>
        <div>Projektmunka</div>
      </div>
    </div>
  );
}

export default BottomPanel;
