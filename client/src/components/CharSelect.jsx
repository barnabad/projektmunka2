import { useCallback, useEffect, useState } from "react";
function AvatarDisplay({ avatarUrl }) {
  return (
    <div className="p-4 rounded-full shadow-lg">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-20 h-20 rounded-full"
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
}
function AvatarBox() {
  const [seed, setSeed] = useState(generateRandomSeed());
  const [skinNum, setSkinNum] = useState(0);
  const [hatNum, setHatNum] = useState(0);
  const [eyeNum, setEyeNum] = useState(0);
  function generateRandomSeed() {
    return Math.random().toString(36).substring(2, 15);
  }

  const skinColor = [
    "614335",
    "ae5d29",
    "d08b5b",
    "e8d5a7",
    "ffdbb4",
    "10ff30",
  ];
  const hatStyle = [
    "hijab",
    "frizzle",
    "winterHat02",
    "turban",
    "shavedSides",
    "fro",
  ];
  const eyeStyle = ["closed", "winkWacky", "side", "eyeRoll", "hearts", "cry"];

  const getAvatarUrl = useCallback(
    () =>
      `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundType=gradientLinear,gradientLinear&skinColor=${skinColor[skinNum]}&top=${hatStyle[hatNum]}&eyes=${eyeStyle[eyeNum]}`,
    [eyeNum, eyeStyle, hatNum, hatStyle, seed, skinColor, skinNum]
  );

  useEffect(() => {
    getAvatarUrl();
  }, [getAvatarUrl, skinNum, hatNum, eyeNum]);

  //Jobbra nyil
  const randomAvatar = () => {
    setSeed(generateRandomSeed());
  };

  const cycle = (list, direction, state, set) => {
    if (direction) {
      if (state < list.length - 1) {
        set(state + 1);
      } else set(0);
    }
    if (!direction) {
      if (state === 0) {
        set(list.length - 1);
      } else set(state - 1);
    }
  };

  console.log(hatNum);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-3 bg-zinc-700 rounded-lg shadow-lg"
      style={{ height: "370px", width: "250px" }}
    >
      <div className="flex items-center">
        <div className="flex flex-col gap-2">
          <button onClick={() => cycle(hatStyle, 0, hatNum, setHatNum)}>
            &#9664;
          </button>
          <button onClick={() => cycle(skinColor, 0, skinNum, setSkinNum)}>
            &#9664;
          </button>
          <button onClick={() => cycle(eyeStyle, 0, eyeNum, setEyeNum)}>
            &#9664;
          </button>
        </div>
        <div>
          <AvatarDisplay avatarUrl={getAvatarUrl()} />
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => cycle(hatStyle, 1, hatNum, setHatNum)}>
            &#9654;
          </button>
          <button onClick={() => cycle(skinColor, 1, skinNum, setSkinNum)}>
            &#9654;
          </button>
          <button onClick={() => cycle(eyeStyle, 1, eyeNum, setEyeNum)}>
            &#9654;
          </button>
        </div>
      </div>
      <button
        className="shadow-lg w-1/2 p-2 border-2 rounded-lg border-zinc-500 hover:border-zinc-400  "
        onClick={randomAvatar}
      >
        Random
      </button>
    </div>
  );
}

export default AvatarBox;
