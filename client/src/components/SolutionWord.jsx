import { useStore } from "../store/store";

function Letter({ value }) {
  return (
    <div>
      <div className="w-5 border-b border border-white relative">
        <span className="absolute left-1/2 -translate-x-1/2 text-xl -top-7">
          {value}
        </span>
      </div>
    </div>
  );
}

function SolutionWord() {
  const { currentWord, wordLength, hints } = useStore();

  return (
    <div className="flex gap-1 self-end flex-grow justify-center p-3">
      {currentWord ? (
        <div className="text-lg font-semibold tracking-wide">{currentWord}</div>
      ) : (
        Array.from({ length: wordLength }).map((_, index) => {
          const hint = hints.find((item) => index === item.position);
          return <Letter key={index} value={hint ? hint.letter : null} />;
        })
      )}
      {!currentWord && <sub className="text-white">{wordLength}</sub>}
    </div>
  );
}

export default SolutionWord;
