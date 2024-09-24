import { useState } from "react";

function CreateDropdown() {
  return (
    <div className="w-[400px] shadow-lg flex flex-col gap-4 bg-zinc-700 p-4 rounded-lg">
      <div className="text-lg text-center">Create Room</div>
      <div className="flex items-center justify-between">
        <div className="w-1/3">Players</div>
        <select className="w-full text-center p-1 rounded-lg bg-zinc-700 border-2 border-zinc-600 hover:border-zinc-500 focus:border-zinc-500 outline-none shadow-lg">
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">Drawtime</div>
        <select className="w-full text-center p-1 rounded-lg bg-zinc-700 border-2 border-zinc-600 hover:border-zinc-500 focus:border-zinc-500 outline-none shadow-lg">
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="80">80</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">Rounds</div>
        <select className="w-full text-center p-1 rounded-lg bg-zinc-700 border-2 border-zinc-600 hover:border-zinc-500 focus:border-zinc-500 outline-none shadow-lg">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <button className="p-2 border-2 hover:border-zinc-500 rounded-lg w-full border-zinc-600 shadow-lg">
        Create
      </button>
    </div>
  );
}

function JoinDropdown() {
  return (
    <div className="w-[400px] bg-zinc-700 p-4 rounded-lg shadow-lg">
      <div className="mb-4 text-center text-lg">Join Room</div>
      <input
        placeholder="Room code"
        className="w-full shadow-lg focus:outline focus:outline-2 focus:outline-zinc-500 rounded-lg p-2 mb-4 bg-zinc-600 text-white"
        type="text"
      />
      <button className="p-2 border-2 hover:border-zinc-500 rounded-lg w-full border-zinc-600 shadow-lg">
        Join
      </button>
    </div>
  );
}

function LandingPage() {
  const [dropdownPage, setDropdownPage] = useState(false);

  return (
    <div className="w-[400px] self-start mt-20">
      <div className="p-4 rounded-lg bg-zinc-700 mb-4">
        <h1 className="mb-4 text-2xl text-center">Projektmunka</h1>
        <input
          className="w-full shadow-lg focus:outline focus:outline-2 focus:outline-zinc-500 rounded-lg p-2 bg-zinc-600 text-white mb-4"
          type="text"
          placeholder="Enter name"
        />
        <div className="flex justify-between gap-2">
          <button
            onClick={() => setDropdownPage(true)}
            className={`w-1/2 shadow-lg p-2 border-2 rounded-lg hover:border-zinc-500 ${
              dropdownPage
                ? "bg-zinc-600 border-zinc-500"
                : "bg-zinc-700 border-zinc-600"
            }`}
          >
            Create Room
          </button>
          <button
            onClick={() => setDropdownPage(false)}
            className={`shadow-lg w-1/2 p-2 border-2 rounded-lg hover:border-zinc-500 ${
              !dropdownPage
                ? "bg-zinc-600 border-zinc-500"
                : "bg-zinc-700 border-zinc-600"
            }`}
          >
            Join Room
          </button>
        </div>
      </div>
      <div>{dropdownPage ? <CreateDropdown /> : <JoinDropdown />}</div>
    </div>
  );
}

export default LandingPage;
