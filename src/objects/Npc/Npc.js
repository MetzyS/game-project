import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { storyFlags } from "../../StoryFlags";
import { Vector2 } from "../../Vector2";

export class Npc extends GameObject {
  constructor(x, y, textConfig = {}) {
    super({
      position: new Vector2(x, y),
    });

    // Collision
    this.isSolid = true;

    // Texte dialogue
    this.textContent = textConfig.content;
    this.textPortraitFrame = textConfig.portraitFrame;

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    // Body sprite
    const body = new Sprite({
      resource: resources.images.knight,
      frameSize: new Vector2(32, 32),
      hFrames: 2,
      vFrames: 1,
      position: new Vector2(-8, -20),
    });
    this.addChild(body);
  }

  getContent() {
    // Ici logique de story flag (si tel action faite => tel dialogue...)
    const match = storyFlags.getRelevantScenario(this.textContent);
    if (!match) {
      console.warn("Aucune correspondance dans la liste", this.textContent);
      return null;
    }

    return {
      portraitFrame: this.textPortraitFrame, // frame 1 du spreadsheet
      string: match.string,
      addsFlag: match.addsFlag ?? null,
    };
  }
}
