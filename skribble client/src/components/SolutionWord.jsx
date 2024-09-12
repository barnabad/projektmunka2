import React from "react";
import Letter from "./Letter";
import useStore from "../store";

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
