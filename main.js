import "./style.css";
import { resources } from "./src/Resource";
import { Sprite } from "./src/Sprite";
import { Vector2 } from "./src/Vector2";
import { GameLoop } from "./src/GameLoop";
import { Input } from "./src/Input";
import { gridCells } from "./src/helpers/grid";
import { GameObject } from "./src/GameObject";
import { Hero } from "./src/objects/Hero/Hero";
import { Camera } from "./src/Camera";

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

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180), // toute la taille de la frame
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

// Ajout camera
const camera = new Camera();
mainScene.addChild(camera);

// Ajout des inputs
mainScene.input = new Input();

// Creation de le l'update et draw loop
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};

// Render mainScene dans le canvas (ctx)
const draw = () => {
  // Clear le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // attache le sprite du ciel à 0,0 pour éviter qu'il bouge avec la caméra
  skySprite.drawImage(ctx, 0, 0);

  // gestion camera
  // Save le current state (pour l'offest de la camera)
  ctx.save();

  // Offset cam
  ctx.translate(camera.position.x, camera.position.y);

  // Draw les la mainScene avec les objets
  mainScene.draw(ctx, 0, 0);

  // Restaure le state original
  ctx.restore();
};

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start(); // Lancement de la loop
