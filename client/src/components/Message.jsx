import React from "react";
//${index % 2 === 1 && "bg-zinc-800"}
function Message({ index, name, message }) {
  return (
    <div className={`p-1 border-b-2 border-zinc-600`}>
      <div className="font-semibold">{name}</div>
      <div>{message}</div>
    </div>
  );
}

export default Message;
