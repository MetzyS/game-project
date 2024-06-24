import { GameObject } from "../../GameObject";
import { Vector2 } from "../../Vector2";
import { Sprite } from "../../Sprite";
import { resources } from "../../Resource";

export class House extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });
    this.addChild(
      new Sprite({
        resource: resources.images.house,
        frameSize: new Vector2(78, 72),
      })
    );
  }
}
