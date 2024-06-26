import "./style.css";
import { Vector2 } from "./src/Vector2";
import { GameLoop } from "./src/GameLoop";
import { Main } from "./src/objects/Main/Main";
import { OutdoorLevel1 } from "./src/levels/OutdoorLevel1";

// Context d'un canvas permet de "dessiner" dans le canvas.
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Création root scene (type Main)
const mainScene = new Main({
  position: new Vector2(0, 0),
});

mainScene.setLevel(new OutdoorLevel1());
// mainScene.setLevel(new CaveLevel1());

// Creation de le l'update et draw loop
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
  mainScene.input?.update(); // refresh les inputs après chaque frame (a faire après les steps pour permettre aux autres objets/classes de vérifier si une touche est pressée ou non)
};

// Render mainScene dans le canvas (ctx)
const draw = () => {
  // Clear le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Affiche le background
  mainScene.drawBackground(ctx);

  // gestion camera
  // Save le current state (pour l'offest de la camera)
  ctx.save();

  // Offset cam
  if (mainScene.camera) {
    ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
  }

  // Draw les la mainScene avec les objets
  mainScene.drawObjects(ctx);

  // Restaure le state original
  ctx.restore();

  // Affiche tout ce qui doit rester au foreground (niveau, inventaire, text box...)
  mainScene.drawForeground(ctx);
};

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start(); // Lancement de la loop
