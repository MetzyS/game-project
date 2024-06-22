import "./style.css";
import { resources } from "./src/Resource";
import { Sprite } from "./src/Sprite";
import { Vector2 } from "./src/Vector2";
import { GameLoop } from "./src/GameLoop";
import { Input } from "./src/Input";
import { gridCells } from "./src/helpers/grid";
import { GameObject } from "./src/GameObject";
import { Hero } from "./src/objects/Hero/Hero";
import { events } from "./src/Events";

// Context d'un canvas permet de "dessiner" dans le canvas.
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Création root scene
const mainScene = new GameObject({
  position: new Vector2(0, 0),
});

// Construction de la scene en ajoutant le ciel, le sol et le héro
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180), // toute la taille de la frame
});
mainScene.addChild(skySprite);

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180), // toute la taille de la frame
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

// Ajout des inputs
mainScene.input = new Input();

events.on("HERO_POSITION", mainScene, (heroPosition) => {
  console.log("HERO MOVED", heroPosition);
});

// Creation de le l'update et draw loop
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};

// Render mainScene dans le canvas (ctx)
const draw = () => {
  mainScene.draw(ctx, 0, 0);
};

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start(); // Lancement de la loop
