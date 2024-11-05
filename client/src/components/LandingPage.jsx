import { useState } from "react";
import { useStore } from "../store/store";
import { socket } from "../utils/socket";
import toast from "react-hot-toast";
import AvatarBox from "./CharSelect";

function CreateDropdown() {
  const { name, drawTime, setDrawTime, maxRounds, setMaxRounds } = useStore();
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [language, setLanguage] = useState("hungarian");

  const handleCreate = () => {
    if (name) {
      socket.emit("create-room", {
        name: name,
        options: {
          maxRounds: maxRounds,
          maxPlayers: maxPlayers,
          drawTime: drawTime,
          language: language,
        },
      });
    } else toast.error("Name field missing dxxddd");
  };

  return (
    <div className="w-[400px] shadow-lg flex flex-col gap-4 bg-zinc-700 p-4 rounded-lg">
      <div className="text-lg text-center">Create Room</div>
      <div className="flex items-center justify-between">
        <div className="w-1/3">Players</div>
        <select
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(Number(e.target.value))}
          className="w-full text-center p-1 rounded-lg bg-zinc-700 border-2 border-zinc-600 hover:border-zinc-500 focus:border-zinc-500 outline-none shadow-lg"
        >
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">Drawtime</div>
        <select
          value={drawTime}
          onChange={(e) => setDrawTime(Number(e.target.value))}
          className="w-full text-center p-1 rounded-lg bg-zinc-700 border-2 border-zinc-600 hover:border-zinc-500 focus:border-zinc-500 outline-none shadow-lg"
        >
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="80">80</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">Rounds</div>
        <select
          value={maxRounds}
          onChange={(e) => setMaxRounds(Number(e.target.value))}
          className="w-full text-center p-1 rounded-lg bg-zinc-700 border-2 border-zinc-600 hover:border-zinc-500 focus:border-zinc-500 outline-none shadow-lg"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">Language</div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full text-center p-1 rounded-lg bg-zinc-700 border-2 border-zinc-600 hover:border-zinc-500 focus:border-zinc-500 outline-none shadow-lg"
        >
          <option value="hungarian">Hungarian</option>
          <option value="english">English</option>
        </select>
      </div>
      <button
        onClick={handleCreate}
        className="p-2 border-2 hover:border-zinc-500 rounded-lg w-full border-zinc-600 shadow-lg"
      >
        Create
      </button>
    </div>
  );
}

function JoinDropdown() {
  const { name } = useStore();
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = () => {
    if (name && roomCode) {
      socket.emit("join-room", { roomId: roomCode, name: name});
    } else toast.error("Name or Room Code missing");
  };

  return (
    <div className="w-[400px] bg-zinc-700 p-4 rounded-lg shadow-lg">
      <div className="mb-4 text-center text-lg">Join Room</div>
      <input
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder="Room code"
        className="w-full shadow-lg focus:outline focus:outline-2 focus:outline-zinc-500 rounded-lg p-2 mb-4 bg-zinc-600 text-white"
        type="text"
      />
      <button
        onClick={handleJoin}
        className="p-2 border-2 hover:border-zinc-500 rounded-lg w-full border-zinc-600 shadow-lg"
      >
        Join
      </button>
    </div>
  );
}

function LandingPage() {
  const [dropdownPage, setDropdownPage] = useState(false);

  const { name, setName } = useStore();

  return (
    <div className="w-[400px] self-start mt-20">
      <div className="p-4 rounded-lg bg-zinc-700 mb-4">
        <h1 className="mb-4 text-2xl text-center">Projektmunka</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
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

//LANDINGPAGE avatarral 
function LandingPageWithAvatar() {
  const { name } = useStore();

  return (
    <div className="flex gap-4 items-center">

      <div className="flex-shrink-0" style={{ height: '290px', width: '250px' }}> 
        <AvatarBox name={name} />
      </div>

      <LandingPage />
    </div>
  );
}

export default LandingPageWithAvatar;