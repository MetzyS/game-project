import { events } from "../Events";
import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { House } from "../objects/House/House";
import { Level } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { CaveLevel1 } from "./CaveLevel1";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));

export class OutdoorLevel1 extends Level {
  constructor(params = {}) {
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

    // const house = new House(gridCells(5), gridCells(1));
    // this.addChild(house);

    this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
    const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
    this.addChild(hero);

    // Ajout item Rod
    const rod = new Rod(gridCells(7), gridCells(6));
    this.addChild(rod);

    // MURS
    this.walls = new Set();
    // // Coordonnées des murs invisibles (pour colision) de la map correspondant à ground.png
    // x = horizontal, y = vertical

    // walls exterieurs
    // => gauche
    this.walls.add(`32,48`);
    this.walls.add(`32,64`);
    this.walls.add(`32,80`);
    this.walls.add(`32,96`);
    // => haut
    this.walls.add(`48,32`);
    this.walls.add(`80,32`);
    this.walls.add(`96,32`);
    this.walls.add(`112,16`);
    this.walls.add(`128,16`);
    this.walls.add(`144,16`);
    this.walls.add(`160,16`);
    this.walls.add(`176,16`);
    this.walls.add(`192,16`);
    this.walls.add(`208,16`);
    this.walls.add(`240,32`);
    // => droite
    // this.walls.add(`256,48`);
    this.walls.add(`256,64`);
    this.walls.add(`256,80`);
    this.walls.add(`256,96`);
    // => bas
    this.walls.add(`48,112`);
    this.walls.add(`64,112`);
    this.walls.add(`80,112`);
    this.walls.add(`96,112`);
    this.walls.add(`112,112`);
    this.walls.add(`128,112`);
    this.walls.add(`144,112`);
    this.walls.add(`160,112`);
    this.walls.add(`176,112`);
    this.walls.add(`240,112`);

    // arbres
    this.walls.add(`64,48`);
    this.walls.add(`224,32`);
    this.walls.add(`208,64`);

    // blocs
    this.walls.add(`64,64`);
    this.walls.add(`64,80`);
    this.walls.add(`80,64`);
    this.walls.add(`80,80`);
    this.walls.add(`128,48`);
    this.walls.add(`144,48`);

    // eau
    this.walls.add(`112,80`);
    this.walls.add(`128,80`);
    this.walls.add(`144,80`);
    this.walls.add(`160,80`);

    // rochers
    this.walls.add(`192,96`);
    this.walls.add(`208,96`);
    this.walls.add(`224,96`);

    // maison
    this.walls.add(`224,64`);
  }

  ready() {
    events.on("HERO_EXITS", this, () => {
      console.log("HERO_EXITS", this);
      // Une fois que le hero marche sur l'exit point (escaliers), on emmet un signal "CHANGE_LEVEL" et Main (root scene) s'occupera du reste
      events.emit(
        "CHANGE_LEVEL",
        new CaveLevel1({
          heroPosition: new Vector2(gridCells(4), gridCells(5)),
        })
      );
    });
  }
}
