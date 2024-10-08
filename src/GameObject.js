import { events } from "./Events";
import { Vector2 } from "./Vector2";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false; // Evite que les objets non utilisé dans le jeu puissent "listen to events"
    this.isSolid = false; // Permet de "prendre de la place" et ajouter de la collision
    this.drawLayer = null; // Permet d'avoir du layering (devant/derrière) par rapport à la position y
  }

  // Début de la loop
  stepEntry(delta, root) {
    // Call .update de chaque child
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call ready on the first frame
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta, root);
  }

  /**
   * Called before the first step, en gros on crée une methode de lifecycle
   */
  ready() {}

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
    this.getDrawChildrenOrdered().forEach((child) =>
      child.draw(ctx, drawPosX, drawPosY)
    );
  }

  // Trie les enfants à draw en ordre ascendant via leur position.y
  // permet le layering, draw y de haut en bas pour avoir un effet devant/derrière
  getDrawChildrenOrdered() {
    return [...this.children].sort((a, b) => {
      // Contourne le layering pour afficher toujours au sol (ex: pour les escaliers, exits...)
      if (b.drawLayer === "FLOOR") {
        return 1;
      }
      return a.position.y > b.position.y ? 1 : -1;
    });
  }

  drawImage(ctx, drawPosX, drawPosY) {
    //...
  }

  // Suppression recursive de l'objet & de ses enfants
  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.parent.removeChild(this);
  }

  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    // console.log("GameObject.removeChild", gameObject);
    events.unsubscribe(gameObject);
    this.children = this.children.filter((object) => {
      return gameObject !== object;
    });
  }
}
