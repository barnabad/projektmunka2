import { useCallback, useEffect, useMemo, useState } from "react";
import { useStore } from "../store/store";

// AvatarDisplay component remains the same
function AvatarDisplay({ avatarUrl }) {
  return (
    <div className="p-2 rounded-full shadow-lg mx-2 border-2 border-zinc-600">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-32 h-32 rounded-full"
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
}

function AvatarBox() {
  const { avatarUrl, setAvatarUrl } = useStore(); // Access avatarUrl from the global store
  const [seed, setSeed] = useState(generateRandomSeed());
  const [skinNum, setSkinNum] = useState(0);
  const [hatNum, setHatNum] = useState(0);
  const [eyeNum, setEyeNum] = useState(0);
  const [changed, setChanged] = useState(false);

  function generateRandomSeed() {
    return Math.random().toString(36).substring(2, 15);
  }

  const skinColor = useMemo(
    () => ["8d5524", "c68642", "e0ac69", "f1c27d", "ffdbac", "31a30f"],
    []
  );
  const hatStyle = useMemo(
    () => [
      "bigHair",
      "bob",
      "bun",
      "curly",
      "curvy",
      "dreads",
      "dreads01",
      "dreads02",
      "frida",
      "frizzle",
      "fro",
      "froBand",
      "hat",
      "hijab",
      "longButNotTooLong",
      "miaWallace",
      "shaggy",
      "shaggyMullet",
      "shavedSides",
      "shortCurly",
      "shortFlat",
      "shortRound",
      "shortWaved",
      "sides",
      "straight01",
      "straight02",
      "straightAndStrand",
      "theCaesar",
      "theCaesarAndSidePart",
      "turban",
      "winterHat1",
      "winterHat02",
      "winterHat03",
      "winterHat04",
    ],
    []
  );
  const eyeStyle = useMemo(
    () => [
      "closed",
      "cry",
      "default",
      "eyeRoll",
      "happy",
      "hearts",
      "side",
      "squint",
      "surprised",
      "wink",
      "winkWacky",
      "xDizzy",
    ],
    []
  );

  // Generate avatar URL and store it in global state
  const getAvatarUrl = useCallback(() => {
    let url = `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundType=gradientLinear${
      changed
        ? `&skinColor=${skinColor[skinNum]}&top=${hatStyle[hatNum]}&eyes=${eyeStyle[eyeNum]}`
        : ""
    }`;
    setAvatarUrl(url);
    return url;
  }, [
    seed,
    skinColor,
    skinNum,
    hatStyle,
    hatNum,
    eyeStyle,
    eyeNum,
    changed,
    setAvatarUrl,
  ]);

  useEffect(() => {
    getAvatarUrl();
  }, [seed, skinNum, hatNum, eyeNum, changed]);

  const randomAvatar = () => {
    setSeed(generateRandomSeed());
    setChanged(false);
  };

  const cycle = (list, direction, state, set) => {
    if (direction) {
      if (state < list.length - 1) {
        set(state + 1);
      } else set(0);
    } else {
      if (state === 0) {
        set(list.length - 1);
      } else set(state - 1);
    }
    setChanged(true);
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-3 bg-zinc-700 rounded-lg shadow-lg"
      style={{ height: "370px", width: "250px" }}
    >
      <div className="flex items-center">
        <div className="flex flex-col gap-2">
          <button
            className="p-1 hover:text-zinc-500 text-zinc-400"
            onClick={() => cycle(hatStyle, 0, hatNum, setHatNum)}
          >
            &#9664;
          </button>
          <button
            className="p-1 hover:text-zinc-500 text-zinc-400"
            onClick={() => cycle(skinColor, 0, skinNum, setSkinNum)}
          >
            &#9664;
          </button>
          <button
            className="p-1 hover:text-zinc-500 text-zinc-400"
            onClick={() => cycle(eyeStyle, 0, eyeNum, setEyeNum)}
          >
            &#9664;
          </button>
        </div>
        <div>
          <AvatarDisplay avatarUrl={avatarUrl} />
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="p-1 hover:text-zinc-500 text-zinc-400"
            onClick={() => cycle(hatStyle, 1, hatNum, setHatNum)}
          >
            &#9654;
          </button>
          <button
            className="p-1 hover:text-zinc-500 text-zinc-400"
            onClick={() => cycle(skinColor, 1, skinNum, setSkinNum)}
          >
            &#9654;
          </button>
          <button
            className="p-1 hover:text-zinc-500 text-zinc-400"
            onClick={() => cycle(eyeStyle, 1, eyeNum, setEyeNum)}
          >
            &#9654;
          </button>
        </div>
      </div>
      <button
        className="shadow-lg p-2 border-2 rounded-lg border-zinc-600 hover:border-zinc-500"
        onClick={randomAvatar}
      >
        Random
      </button>
    </div>
  );
}

export default AvatarBox;
