import { useState } from "react";
import { useStore } from "../store/store";
import { socket } from "../utils/socket";

function Message({ name, message }) {
  return (
    <div className={`p-1 border-b-2 border-zinc-600`}>
      <div className="font-semibold">{name}</div>
      <div>{message}</div>
    </div>
  );
}

function ChatPanel() {
  const [inputText, setInputText] = useState("");
  const { name, myRoomId, chatMessages } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      name: name,
      roomId: myRoomId,
      message: inputText,
    });
    setInputText("");
  };

  return (
    <div className="flex-shrink-0 w-[275px] flex flex-col bg-zinc-700 p-3 rounded-lg gap-3 h-[600px]">
      <div className="flex-grow bg-zinc-700 pr-1 flex flex-col gap-[1px] rounded-lg overflow-auto">
        {chatMessages.map((item, index) => (
          <Message key={index} name={item.name} message={item.message} />
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
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
