import {
  CanvasOverlay,
  ChooseWordContent,
  PostGameContent,
  PreGameContent,
  RoundEndContent,
} from "./CanvasOverlay";

function CanvasPanel() {
  return (
    <div className="w-[800px] h-[600px] relative flex flex-shrink-0 p-3 bg-zinc-700 rounded-lg">
      <canvas
        width={776}
        height={576}
        className="bg-white w-full h-auto"
      ></canvas>

      <CanvasOverlay>
        {/* <PreGameContent /> */}
        {/* <ChooseWordContent isChoosing={true} /> */}
        {/* <RoundEndContent/> */}
        {/* <PostGameContent/> */}
      </CanvasOverlay>
    </div>
  );
}

export default CanvasPanel;
