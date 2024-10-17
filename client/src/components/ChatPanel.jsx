import { useState } from "react";
import { useStore } from "../store/store";
import { socket } from "../utils/socket";

function Message({ senderId, name, message }) {
  const { mySocketId } = useStore();

  return (
    <div className={`p-1 border-b-2 border-zinc-600`}>
      {senderId !== "server" && (
        <div className={`font-semibold`} title={name}>
          {name.length > 25 ? name.substring(0, 25) + "..." : name}
        </div>
      )}
      <div
        className={`break-words ${senderId === "server" && "text-orange-500"}`}
      >
        {message}
      </div>
    </div>
  );
}

function ChatPanel() {
  const [inputText, setInputText] = useState("");
  const { name, myRoomId, chatMessages, mySocketId, drawerId } = useStore();

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
      <div className="flex-grow bg-zinc-700 pr-1 flex flex-col gap-[1px] rounded-lg overflow-y-auto overflow-x-hidden">
        {chatMessages.map((item, index) => (
          <Message
            key={index}
            senderId={item.senderId}
            name={item.name}
            message={item.message}
          />
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            disabled={drawerId === mySocketId}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Guess something..."
            className="w-full shadow-lg focus:outline focus:outline-2 focus:outline-zinc-500 rounded-lg p-2 bg-zinc-600 text-white disabled:cursor-not-allowed"
            type="text"
          />
        </form>
      </div>
    </div>
  );
}

export default ChatPanel;
