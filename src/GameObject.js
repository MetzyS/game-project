import { Vector2 } from "./Vector2";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
  }

  // Début de la loop
  stepEntry(delta, root) {
    // Call .update de chaque child
    this.children.forEach((child) => child.stepEntry(delta, root));

    this.step(delta, root);
  }

  /**
   * Fired une fois par frame
   * @param {*} _delta
   */
  step(_delta) {
    //..
  }

  /* draw entry */
  draw(ctx, x, y) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    // rendering de les images
    this.drawImage(ctx, drawPosX, drawPosY);

    // rendering childrens (children après image car par exemple si le hero à un chapeau (qui sera un child), le hero sera draw avant le chapeau)
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }
  drawImage(ctx, drawPosX, drawPosY) {
    //...
  }

  addChild(gameObject) {
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    this.children = this.children.filter((object) => {
      return gameObject !== object;
    });
  }
}
