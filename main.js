import { GameLoop } from "./src/GameLoop";
import { resources } from "./src/Resource";
import { Sprite } from "./src/Sprite";
import { Vector2 } from "./src/Vector2";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input";
import "./style.css";
import { gridCells, isSpaceFree } from "./src/helpers/grid";
import { moveTowards } from "./src/helpers/moveTowards";
import { walls } from "./src/levels/level1";

const canvas = document.querySelector("#game-canvas");
// Context d'un canvas permet de "dessiner" dans le canvas.
const ctx = canvas.getContext("2d");

// Définition des sprites
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180), // toute la taille de la frame
});
const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180), // toute la taille de la frame
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1, // La valeur a changer pour modifier "l'animation" du héro
  position: new Vector2(gridCells(6), gridCells(5)),
});

const heroDestinationPosition = hero.position.duplicate();

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

// position du héro
const input = new Input();
// const heroSpeed = 1;

/**
 * Met à jour les entitées
 */
const update = () => {
  // calcul en px de la distance entre la position actuelle et la destination
  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <= 1; // True/false est ce que le personnage est bien arrivé a destination
  if (hasArrived) {
    tryMove();
  }
};

// deplacement du hero
const tryMove = () => {
  if (!input.direction) {
    return;
  }

  //   track la destination
  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  //   taille de chaque cell
  const gridSize = 16;

  if (input.direction === DOWN) {
    // hero.position.y += heroSpeed;
    nextY += gridSize;
    hero.frame = 0;
  }
  if (input.direction === UP) {
    nextY -= gridSize;
    hero.frame = 6;
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    hero.frame = 9;
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    hero.frame = 3;
  }

  // Check si il n'y a pas de wall @ nextX ou nextY (destination souhaitée input) en comparant avec walls{}
  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
  }
};

/**
 * Render (dessine/draw) dans le canvas
 */
const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // Centrer le hero dans la case
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + 1 + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
};

// game loop
const gameLoop = new GameLoop(update, draw);
gameLoop.start(); // Lancement de la loop
