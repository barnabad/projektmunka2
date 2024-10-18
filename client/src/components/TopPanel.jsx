import { useStore } from "../store/store";
import SolutionWord from "./SolutionWord";
import { Copy, Settings } from "lucide-react";
import { toast } from "react-hot-toast";

function TopPanel() {
  const { drawTimeLeft, gameState, myRoomId } = useStore();

  const copyCode = () => {
    try {
      navigator.clipboard.writeText(myRoomId);
      toast.success("Room code copied to clipboard");
    } catch (error) {
      toast.error("Error while copying to clipboard");
    }
  };

  return (
    <div className="flex items-center gap-3 bg-zinc-700 rounded-lg">
      <div className="flex gap-2 items-center text-lg w-[200px] p-3">
        Time left:
        <span className="font-semibold">{drawTimeLeft}s</span>
      </div>
      {gameState === "playing" && <SolutionWord />}
      {(gameState === "preGame" || gameState === "postGame") && (
        <div className="text-lg flex-grow justify-center items-center flex gap-3">
          Room code: {myRoomId}
          <button title="Copy code" onClick={copyCode}>
            <Copy size={20} />
          </button>
        </div>
      )}
      <div className="cursor-pointer w-[275px] flex ml-auto justify-end items-center p-3">
        <Settings size={30} />
      </div>
    </div>
  );
}

export default TopPanel;
