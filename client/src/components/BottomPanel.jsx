import { Eraser, PaintBucket, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const colorNames = [
  [
    "white",
    "gray-400",
    "red-400",
    "orange-400",
    "yellow-400",
    "green-400",
    "sky-400",
    "blue-400",
    "purple-400",
    "pink-400",
    "orange-700",
  ],
  [
    "black",
    "gray-700",
    "red-700",
    "orange-500",
    "yellow-600",
    "green-950",
    "sky-900",
    "blue-950",
    "purple-950",
    "pink-900",
    "orange-950",
  ],
];

function ColorBlock({ colorName, setSelectedColor }) {
  return (
    <div
      className={`w-[25px] bg-${colorName}`}
      data-color={colorName}
      onClick={(e) => setSelectedColor(e.target.dataset.color)}
    ></div>
  );
}

function BottomPanel({ allRounds, currentRound }) {
  const [selectedColor, setSelectedColor] = useState("black");

  return (
    <div className="rounded-lg bg-zinc-700 flex gap-3">
      <div className="w-[200px] p-3 text-xl flex justify-center items-center font-semibold">
        {`Round ${currentRound} of ${allRounds}`}
      </div>
      <div className="flex-grow p-3 gap-3 flex justify-center items-center">
        <div
          className={`w-[54px] h-[54px] bg-${selectedColor} rounded-lg border-2 border-zinc-600`}
        ></div>
        <div className="border-2 border-zinc-600 rounded-lg overflow-hidden cursor-pointer">
          <div className="h-[25px] flex">
            {colorNames[0].map((item) => (
              <ColorBlock
                key={item}
                colorName={item}
                setSelectedColor={setSelectedColor}
              />
            ))}
          </div>
          <div className="h-[25px] flex">
            {colorNames[1].map((item) => (
              <ColorBlock
                key={item}
                colorName={item}
                setSelectedColor={setSelectedColor}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-1">
          <div className="shadow-lg border-2 rounded-lg border-zinc-600 p-2 cursor-pointer hover:border-zinc-500">
            <Pencil size={34} />
          </div>
          <div className="shadow-lg border-2 rounded-lg border-zinc-600 p-2 cursor-pointer hover:border-zinc-500">
            <PaintBucket size={34} />
          </div>
          <div className="shadow-lg border-2 rounded-lg border-zinc-600 p-2 cursor-pointer hover:border-zinc-500">
            <Eraser size={34} />
          </div>
          <div className="shadow-lg border-2 rounded-lg hover:border-zinc-500 border-zinc-600 p-2 cursor-pointer">
            <Trash2 size={34} />
          </div>
        </div>
      </div>
      <div className="w-[275px] p-3 flex items-center justify-center flex-col gap-2">
        <div>[ Verzio X - 2024.XX.XX ]</div>
        <div>Projektmunka</div>
      </div>
    </div>
  );
}

export default BottomPanel;
