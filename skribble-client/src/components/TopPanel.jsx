import React from "react";
import SolutionWord from "./SolutionWord";
import { Settings } from "lucide-react";

function TopPanel() {
  return (
    <div className="flex items-center gap-3 bg-zinc-700 rounded-lg">
      <div className="flex gap-2 items-center text-lg w-[200px] p-3">
        Time left:
        <span className="font-semibold">120s</span>
      </div>
      <SolutionWord />
      <div className="cursor-pointer w-[275px] flex justify-end items-center p-3">
        <Settings size={30} />
      </div>
    </div>
  );
}

export default TopPanel;
