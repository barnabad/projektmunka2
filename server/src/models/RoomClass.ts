import { Player } from "./PlayerClass.js";

export class Room {
  roomId: string;
  language: "english" | "hungarian";
  maxPlayers: number;
  maxRound: number;
  drawTime: number;
  ownerId: string;
  playersList: Player[]; // Összes játékos a szobában
  currentRound: number;
  currentDrawer: string;
  drawersList: string[]; // Játékosok akik rajzolhatnak az adott körben

  constructor(
    roomId: string,
    language: "english" | "hungarian",
    maxPlayers: number,
    maxRound: number,
    drawTime: number,
    owner: Player,
    ownerId: string
  ) {
    this.roomId = roomId;
    this.language = language;
    this.maxPlayers = maxPlayers;
    this.maxRound = maxRound;
    this.drawTime = drawTime;
    this.ownerId = ownerId;
    this.playersList = new Array(owner);
    this.currentRound = 1;
    this.currentDrawer = ownerId;
    this.drawersList = new Array(ownerId);
  }
}
