import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
  constructor() {
    super({});

    events.on("HERO_POSITION", this, (heroPosition) => {
      this.centerPositionOnTarget(heroPosition);
    });

    // Positionnement de la caméra lors d'un changement de niveau (pour éviter le jump de frame)
    events.on("CHANGE_LEVEL", this, (newMap) => {
      this.centerPositionOnTarget(newMap.heroStartPosition);
    });
  }

  centerPositionOnTarget(pos) {
    const personHalf = 8; // moitié de la largeur du hero (16)
    const canvasWidth = 320; // width du canvas
    const canvasHeight = 180; // height du canvas

    //   centrer le personnage
    const halfWidth = -personHalf + canvasWidth / 2;
    const halfHeight = -personHalf + canvasHeight / 2;
    this.position = new Vector2(-pos.x + halfWidth, -pos.y + halfHeight);
  }
}
