import React from "react";
import useStore from "../store";

function Letter({ value, show }) {
  return (
    <div>
      <div className="w-5 border-b border border-white relative">
        <span className="absolute left-1/2 -translate-x-1/2 text-xl -top-7">
          {show ? value : null}
        </span>
      </div>
    </div>
  );
}

function SolutionWord() {
  const { currentWord } = useStore();

  return (
    <div className="flex gap-1 self-end flex-grow justify-center p-3">
      {currentWord.map((item, index) => (
        <Letter key={index} value={item.letter} show={item.show} />
      ))}
      <sub className="text-white">{currentWord.length}</sub>
    </div>
  );
}

export default SolutionWord;
