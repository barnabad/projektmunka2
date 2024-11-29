import { useState } from "react";
import { useStore } from "../store/store";
import { socket } from "../utils/socket";
import toast from "react-hot-toast";
import AvatarBox from "./CharSelect";

function CreateDropdown({ language, setLanguage }) {
  const { name, avatarUrl, drawTime, setDrawTime, maxRounds, setMaxRounds } =
    useStore();
  const [maxPlayers, setMaxPlayers] = useState(2);

  const handleCreate = () => {
    if (name) {
      socket.emit("create-room", {
        name: name,
        avatarUrl: avatarUrl,
        options: {
          maxRounds: maxRounds,
          maxPlayers: maxPlayers,
          drawTime: drawTime,
          language: language,
        },
      });
    } else
      toast.error(language === "english" ? "Name missing" : "Név hiányzik");
  };

  return (
    <div className="w-[400px] shadow-lg flex flex-col gap-4 bg-zinc-700 p-4 rounded-lg">
      <div className="text-lg text-center">
        {language === "english" ? "Create Room" : "Szoba létrehozás"}
      </div>
      <div className="flex items-center justify-between">
        <div className="w-1/3">
          {language === "english" ? "Players" : "Játékosok"}
        </div>
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
        <div className="w-1/3">
          {language === "english" ? "Drawtime" : "Idő"}
        </div>
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
        <div className="w-1/3">
          {language === "english" ? "Rounds" : "Körök"}
        </div>
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
        <div className="w-1/3">
          {language === "english" ? "Language" : "Nyelv"}
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full text-center p-1 rounded-lg bg-zinc-700 border-2 border-zinc-600 hover:border-zinc-500 focus:border-zinc-500 outline-none shadow-lg"
        >
          <option value="hungarian">
            {language === "english" ? "Hungarian" : "Magyar"}
          </option>
          <option value="english">
            {language === "english" ? "English" : "Angol"}
          </option>
        </select>
      </div>
      <button
        onClick={handleCreate}
        className="p-2 border-2 hover:border-zinc-500 rounded-lg w-full border-zinc-600 shadow-lg"
      >
        {language === "english" ? "Create" : "Létrehoz"}
      </button>
    </div>
  );
}

function JoinDropdown({ language, setLanguage }) {
  const { name, avatarUrl } = useStore();
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = () => {
    if (name && roomCode) {
      socket.emit("join-room", {
        roomId: roomCode,
        name: name,
        avatarUrl: avatarUrl,
      });
    } else
      toast.error(
        language === "english"
          ? "Name or Room Code missing"
          : "Név vagy Szoba kód hiányzik"
      );
  };

  return (
    <div className="w-[400px] bg-zinc-700 p-4 rounded-lg shadow-lg">
      <div className="mb-4 text-center text-lg">
        {language === "english" ? "Join Room" : "Szoba csatlakozás"}
      </div>
      <input
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder={language === "english" ? "Room Code" : "Szoba kód"}
        className="w-full shadow-lg focus:outline focus:outline-2 focus:outline-zinc-500 rounded-lg p-2 mb-4 bg-zinc-600 text-white"
        type="text"
      />
      <button
        onClick={handleJoin}
        className="p-2 border-2 hover:border-zinc-500 rounded-lg w-full border-zinc-600 shadow-lg"
      >
        {language === "english" ? "Join" : "Csatlakoz"}
      </button>
    </div>
  );
}

function LandingPage() {
  const [dropdownPage, setDropdownPage] = useState(false);
  const [language, setLanguage] = useState("english");

  const { name, setName } = useStore();

  return (
    <div className="-mt-44 flex items-start gap-4">
      <AvatarBox />
      <div className="p-4 rounded-lg bg-zinc-700 mb-4 w-[400px] relative">
        <h1 className="mb-4 text-2xl text-center">Doodl.io</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full shadow-lg focus:outline focus:outline-2 focus:outline-zinc-500 rounded-lg p-2 bg-zinc-600 text-white mb-4"
          type="text"
          placeholder={language === "english" ? "Enter name" : "Írd be a neved"}
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
            {language === "english" ? "Create Room" : "Szoba létrehozás"}
          </button>
          <button
            onClick={() => setDropdownPage(false)}
            className={`shadow-lg w-1/2 p-2 border-2 rounded-lg hover:border-zinc-500 ${
              !dropdownPage
                ? "bg-zinc-600 border-zinc-500"
                : "bg-zinc-700 border-zinc-600"
            }`}
          >
            {language === "english" ? "Join Room" : "Szoba csatlakozás"}
          </button>
        </div>
        <div className="absolute mt-8 -left-0">
          {dropdownPage ? (
            <CreateDropdown language={language} setLanguage={setLanguage} />
          ) : (
            <JoinDropdown language={language} setLanguage={setLanguage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
