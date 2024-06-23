import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { Level } from "../objects/Level/Level";

export class CaveLevel1 extends Level {
  constructor() {
    super({});

    this.background = new Sprite({
      resource: resources.images.cave, // Image de la caverne
      frameSize: new Vector2(320, 180), // Toute la taille du canvas
    });

    const ground = new Sprite({
      resource: resources.images.caveGround,
      frameSize: Vector2(320, 180),
    });
    this.addChild(ground);

    this.walls = new Set();
  }
}
