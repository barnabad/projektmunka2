import { Eraser, PaintBucket, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

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
            <div
              className="w-[25px] bg-white"
              data-color="white"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-gray-400"
              data-color="gray-400"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-red-400"
              data-color="red-400"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-orange-400"
              data-color="orange-400"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-yellow-400"
              data-color="yellow-400"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-green-400"
              data-color="green-400"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-sky-400"
              data-color="sky-400"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-blue-400"
              data-color="blue-400"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-purple-400"
              data-color="purple-400"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-pink-400"
              data-color="pink-400"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-orange-700"
              data-color="orange-700"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
          </div>
          <div className="h-[25px] flex">
            <div
              className="w-[25px] bg-black"
              data-color="black"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-gray-700"
              data-color="gray-700"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-red-700"
              data-color="red-700"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-orange-500"
              data-color="orange-500"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-yellow-600"
              data-color="yellow-600"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-green-950"
              data-color="green-950"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-sky-900"
              data-color="sky-900"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-blue-950"
              data-color="blue-950"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-purple-950"
              data-color="purple-950"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-pink-900"
              data-color="pink-900"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
            <div
              className="w-[25px] bg-orange-950"
              data-color="orange-950"
              onClick={(e) => setSelectedColor(e.target.dataset.color)}
            ></div>
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
