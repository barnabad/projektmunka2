import { Howl } from "howler";

export const sounds = {
  joinSuccess: new Howl({ src: ["/sounds/playerjoined.wav"], volume: 0.5 }),
  correctSound: new Howl({ src: ["/sounds/correct.mp3"], volume: 0.5 }),
  timeUpSound: new Howl({ src: ["/sounds/timeisup.mp3"], volume: 0.5 }),
  disconnectSound: new Howl({ src: ["/sounds/disconnect.mp3"], volume: 0.5 }),
  roundStart: new Howl({ src: ["/sounds/roundstart.mp3"], volume: 0.5 }),
  gameOver: new Howl({ src: ["/sounds/gameover.mp3"], volume: 0.5 }),
  startRound: new Howl({ src: ["/sounds/startRound.mp3"], volume: 0.5 }),
  clockSound: new Howl({ src: ["/sounds/clock.mp3"], volume: 0.5 }),
};
