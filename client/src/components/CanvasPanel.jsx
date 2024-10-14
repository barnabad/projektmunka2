import {
  CanvasOverlay,
  ChooseWordContent,
  PostGameContent,
  PreGameContent,
  RoundEndContent,
} from "./CanvasOverlay";
import { useStore } from "../store/store";

function CanvasPanel() {
  const { gameState } = useStore();

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
        return <div>Valami nem jó</div>;
    }
  };

  return (
    <div className="w-[800px] h-[600px] relative flex flex-shrink-0 p-3 bg-zinc-700 rounded-lg">
      <canvas
        width={776}
        height={576}
        className="bg-white w-full h-auto"
      ></canvas>

      <CanvasOverlay>{renderContent()}</CanvasOverlay>
    </div>
  );
}

export default CanvasPanel;
