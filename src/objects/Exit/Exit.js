import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Exit extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });
    this.addChild(
      new Sprite({
        resource: resources.images.exit,
      })
    );
  }

  ready() {
    events.on("HERO_POSITION", this, (pos) => {
      //detect overlap (detecte quand le hero marche dessus)
      const roundedHeroX = Math.round(pos.x); // Rounded car quelques fois les positions x/y on des décimales folles (merci JS)
      const roundedHeroY = Math.round(pos.y);
      if (
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        // Emission d'un signal aux autres objets "Le hero à marché dans les escaliers, qu'une autre classe s'occupe de l'event.
        console.log("HERO_EXITS", this);
        events.emit("HERO_EXITS");
      }
    });
  }
}
