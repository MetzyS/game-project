import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";

export class OutdoorLevel1 extends Level {
  constructor() {
    super({});
    this.background = new Sprite({
      resource: resources.images.sky, // Ciel
      frameSize: new Vector2(320, 180), // Toute la taille du canvas
    });

    const groundSprite = new Sprite({
      resource: resources.images.ground,
      frameSize: new Vector2(320, 180), // toute la taille de la frame
    });
    this.addChild(groundSprite);

    const exit = new Exit(gridCells(6), gridCells(3));
    this.addChild(exit);

    const hero = new Hero(gridCells(6), gridCells(5));
    this.addChild(hero);

    // Ajout item Rod
    const rod = new Rod(gridCells(7), gridCells(6));
    this.addChild(rod);
  }
}

// export const walls = new Set();
// // Coordonnées des murs invisibles (pour colision) de la map correspondant à ground.png

// // x = horizontal, y = vertical

// // walls exterieurs
// // => gauche
// walls.add(`32,48`);
// walls.add(`32,64`);
// walls.add(`32,80`);
// walls.add(`32,96`);
// // => haut
// walls.add(`48,32`);
// walls.add(`80,32`);
// walls.add(`96,32`);
// walls.add(`112,16`);
// walls.add(`128,16`);
// walls.add(`144,16`);
// walls.add(`160,16`);
// walls.add(`176,16`);
// walls.add(`192,16`);
// walls.add(`208,16`);
// walls.add(`240,32`);
// // => droite
// // walls.add(`256,48`);
// walls.add(`256,64`);
// walls.add(`256,80`);
// walls.add(`256,96`);
// // => bas
// walls.add(`48,112`);
// walls.add(`64,112`);
// walls.add(`80,112`);
// walls.add(`96,112`);
// walls.add(`112,112`);
// walls.add(`128,112`);
// walls.add(`144,112`);
// walls.add(`160,112`);
// walls.add(`176,112`);
// walls.add(`240,112`);

// // arbres
// walls.add(`64,48`);
// walls.add(`224,32`);
// walls.add(`208,64`);

// // blocs
// walls.add(`64,64`);
// walls.add(`64,80`);
// walls.add(`80,64`);
// walls.add(`80,80`);
// walls.add(`128,48`);
// walls.add(`144,48`);

// // eau
// walls.add(`112,80`);
// walls.add(`128,80`);
// walls.add(`144,80`);
// walls.add(`160,80`);

// // rochers
// walls.add(`192,96`);
// walls.add(`208,96`);
// walls.add(`224,96`);

// // maison
// walls.add(`224,64`);
