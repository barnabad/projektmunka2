import React, { useState } from "react";
function AvatarDisplay({ avatarUrl }) {
  return (
    <div className="p-4 rounded-full shadow-lg"> 
      <img 
        src={avatarUrl} 
        alt="Avatar" 
        className="w-20 h-20 rounded-full" 
        style={{ backgroundColor: 'transparent' }} 
      />
    </div>
  );
}
function AvatarBox() {
    const [seed, setSeed] = useState(generateRandomSeed()); 
    function generateRandomSeed() {
      return Math.random().toString(36).substring(2, 15); 
    }
  
 
    const getAvatarUrl = () => `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}&backgroundType=gradientLinear,gradientLinear`; 
    //Jobbra nyil
    const nextAvatar = () => {
      setSeed(generateRandomSeed()); 
    };
  
    //BalraNYilPrev
    const prevAvatar = () => {
      setSeed(generateRandomSeed()); 
    };
  
    return (
      <div
        className="flex items-center justify-center gap-4 p-3 bg-zinc-700 rounded-lg shadow-lg"
        style={{ height: '370px', width: '250px' }} 
      >
        {/* balra nyil */}
        <button onClick={prevAvatar} className="text-white hover:text-zinc-500">
          &#9664;
        </button>
  
        {/* AvatarDisplay */}
        <AvatarDisplay avatarUrl={getAvatarUrl()} />
  
        {/* jobbra nyil */}
        <button onClick={nextAvatar} className="text-white hover:text-zinc-500">
          &#9654;
        </button>
      </div>
    );
  }
  
  export default AvatarBox;