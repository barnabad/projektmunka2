# Projektmunka 2024/ősz:

Egy web technológián alapuló játékot készítünk el. Ahol a játékosok művészi képességeiket
és kreativitásukat felhasználva egymással versenyeznek. Azért szerettünk volna egy ilyen
szoftvert fejleszteni, mivel a Covid lezárások miatt, nekünk is kihívás volt találkozni
egymással. A magányos hónapokat nagymértékben lerövidítette volna, egy hasonló játék,
amin dolgozunk.

## Ötlet:

A játékosoknak megadott eszközökkel kell rajzolniuk (például ecset) egy webes felületen.
Majd az idő lejártával ezeket a képeket a versenyzők pontozzák és a feladat leírásával
legjobban egyező rajzot rajzoló választhatja ki a következő a következő témát.
Majd a legtöbb ponttal rendelkező játékos nyerné meg a meccset.

## Megvalósítás:

Az alkalmazás modern webes eszközökkel van elkészítve, valós idejű kommunikáció miatt websocketet
létesítünk a szerver és a játékos között.

### Frontend:
 - Frontend könyvtár: React
 - Állapot kezelés: Zustand
 - CSS sítlus: Tailwind CSS

### Backend:
 - Programozási nyelv: Typescript
 - Javascript futtatási környezet: Nodejs
 - Http szerver: Express js
 - Websocket: SocketIO

## Felhasználói felület:

### Szoba létrehozási, csatlakozási felület:
![Szoba létrehozási, csatlakozási felület](https://github.com/user-attachments/assets/5d7f8fe1-78cb-4a97-9496-81bfe047719b)


### Játék felülete:
![Játék felülete](https://github.com/user-attachments/assets/297b8e66-3d8e-44f1-a174-bbb5155cda57)


## Telepítés és futtatás helyi gépen:
Klónozd le a projektet:
```bash
git clone https://github.com/barnabad/projektmunka2.git
```

Menj be a "client" mappába, töltsd le és építsd meg a react komponenseket:
```bash
cd client
```
```bash
npm i
```
```bash
# ha windows
npm run buildWin
```
```bash
# ha linux
npm run buildLin
```

Hozz létre egy "certs" mappát a "server" mappa alá:
```bash
mkdir ./server/certs
```

Generálj SSL kulcsokat vagy másold be a meglevő kulcsaidat (cert.pem, csr.pem, key.pem):
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

Menj be a "server" mappába, töltsd le és fordítsd át a typescript kódokat:
```bash
cd server
```
```bash
npm i
```
```bash
npm run build
```
```bash
npm run start
```
### Projekt felépítése:
- projektmunka2
  - client
  - server

## Docker konténer építése:
Menj be a "server" mappába
```bash
docker build -t doodl-cont ./
```

## Projekt résztvevői:
 - Szabó Marcell
 - Molnár Jakab
 - Gogolyák Péter István
 - Tóth Barnabás
 - Nagy Alex
