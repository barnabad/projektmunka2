import React from "react";

function CanvasOverlay({ isChoosing }) {
  return (
    <div className="z-10 flex justify-center items-center absolute left-3 top-3 inset-3">
      <div className="bg-black opacity-60 absolute inset-0"></div>
      {isChoosing ? (
        <div className="z-20 flex flex-col gap-4 text-xl items-center">
          <div>Choose a word...</div>
          <div className="flex gap-2">
            <button className="p-2 shadow-lg border-zinc-600 bg-zinc-700 border-2 rounded-lg hover:border-zinc-500">
              alma
            </button>
            <button className="p-2 shadow-lg border-zinc-600 bg-zinc-700 border-2 rounded-lg hover:border-zinc-500">
              word
            </button>
            <button className="p-2 shadow-lg border-zinc-600 bg-zinc-700 border-2 rounded-lg hover:border-zinc-500">
              kutya
            </button>
          </div>
        </div>
      ) : (
        <div className="z-20 text-xl">Player is choosing a word...</div>
      )}
    </div>
  );
}

export default CanvasOverlay;
