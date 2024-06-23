import { events } from "../Events";
import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { OutdoorLevel1 } from "./OutdoorLevel1";

export class CaveLevel1 extends Level {
  constructor() {
    super({});

    this.background = new Sprite({
      resource: resources.images.cave, // Image de la caverne
      frameSize: new Vector2(320, 180), // Toute la taille du canvas
    });

    // Ajout image sol
    const ground = new Sprite({
      resource: resources.images.caveGround,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(ground);

    // Ajout escaliers
    const exit = new Exit(gridCells(3), gridCells(5));
    this.addChild(exit);

    // Spawn le hero
    const hero = new Hero(gridCells(4), gridCells(5));
    this.addChild(hero);

    const rod = new Rod(gridCells(9), gridCells(6));
    this.addChild(rod);

    this.walls = new Set();
  }

  ready() {
    events.on("HERO_EXITS", this, () => {
      console.log("HERO_EXITS", this);
      // Une fois que le hero marche sur l'exit point (escaliers), on emmet un signal "CHANGE_LEVEL" et Main (root scene) s'occupera du reste
      events.emit("CHANGE_LEVEL", new OutdoorLevel1());
    });
  }
}
