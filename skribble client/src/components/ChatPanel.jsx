import React from "react";
import Message from "./Message";
import useStore from "../store";

function ChatPanel() {
  const { messages } = useStore();

  return (
    <div className="flex-shrink-0 w-[275px] flex flex-col bg-zinc-700 p-3 rounded-lg gap-3 h-[600px]">
      <div className="flex-grow bg-zinc-700 pr-1 flex flex-col gap-[1px] rounded-lg overflow-auto">
        {messages.map((item, index) => (
          <Message
            key={index}
            index={index}
            name={item.name}
            message={item.message}
          />
        ))}
      </div>
      <div>
        <form className="">
          <input
            placeholder="Type something..."
            className="w-full shadow-lg focus:outline focus:outline-2 focus:outline-zinc-500 rounded-lg p-2 bg-zinc-600 text-white"
            type="text"
          />
        </form>
      </div>
    </div>
  );
}

export default ChatPanel;
