import { useStore } from "../store/store";

function Letter(/*{ value }*/) {
  return (
    <div>
      <div className="w-5 border-b border border-white relative">
        <span className="absolute left-1/2 -translate-x-1/2 text-xl -top-7">
          {/*{currentWord ? value : null}*/}
        </span>
      </div>
    </div>
  );
}

function SolutionWord() {
  const { currentWord, wordLength } = useStore();

  return (
    <div className="flex gap-1 self-end flex-grow justify-center p-3">
      {currentWord
        ? <div className="text-lg font-semibold">{currentWord}</div>
        : Array.from({ length: wordLength }).map((_, index) => (
            <Letter key={index} /*value={currentWord[index]}*/ />
          ))}
      {!currentWord && <sub className="text-white">{wordLength}</sub>}
    </div>
  );
}

export default SolutionWord;
