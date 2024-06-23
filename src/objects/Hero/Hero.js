import { Animations } from "../../Animations";
import { events } from "../../Events";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { DOWN, LEFT, RIGHT, UP } from "../../Input";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
// import { walls } from "../../levels/level1";
import {
  PICK_UP_DOWN,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./heroAnimations";

export class Hero extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1, // La valeur a changer pour modifier "l'animation" du héro
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
      }),
    });

    this.addChild(this.body);

    this.facingDirection = DOWN;
    this.destinationPosition = this.position.duplicate();
    this.itemPickupTime = 0; // permettra de stopper les mouvements un certain temps (en ms) lorsque le hero ramasse un objet
    this.itemPickupShell = null; // permettra d'afficher l'objet (une copie de l'objet) ramassé au dessus de la tête du hero

    // Reaction à l'event "PICKS_UP_ITEM"
    events.on("HERO_PICKS_UP_ITEM", this, (data) => {
      console.log("HERO_PICKS_UP_ITEM", this);
      this.onPickUpItem(data);
    });
  }

  step(delta, root) {
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }

    // calcul en px de la distance entre la position actuelle et la destination
    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1; // True/false est ce que le personnage est bien arrivé a destination
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      return;
    }

    this.lastX = this.position.x;
    this.lastY = this.position.y;
    events.emit("HERO_POSITION", this.position);
  }

  tryMove(root) {
    const { input } = root;
    // deplacement du hero
    if (!input.direction) {
      this.facingDirection === LEFT && this.body.animations.play("standLeft");
      this.facingDirection === RIGHT && this.body.animations.play("standRight");
      this.facingDirection === UP && this.body.animations.play("standUp");
      this.facingDirection === DOWN && this.body.animations.play("standDown");
      return;
    }

    //   track la destination
    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;
    //   taille de chaque cell
    const gridSize = 16;

    input.direction === DOWN &&
      ((nextY += gridSize), this.body.animations.play("walkDown"));

    input.direction === UP &&
      ((nextY -= gridSize), this.body.animations.play("walkUp"));

    input.direction === LEFT &&
      ((nextX -= gridSize), this.body.animations.play("walkLeft"));

    input.direction === RIGHT &&
      ((nextX += gridSize), this.body.animations.play("walkRight"));

    this.facingDirection = input.direction ?? this.facingDirection;

    // Check si il n'y a pas de wall @ nextX ou nextY (destination souhaitée input) en comparant avec walls{}
    if (isSpaceFree(walls, nextX, nextY)) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }

  onPickUpItem({ image, position }) {
    // Arrête le hero sur la position de l'item qu'il est en train de ramasser
    this.destinationPosition = position.duplicate();

    // Debut de l'animation
    this.itemPickupTime = 1000; // en ms
    this.itemPickupShell = new GameObject({}); // on crée une copie de l'objet ramassé (puisque l'objet au sol a été supprimé)
    this.itemPickupShell.addChild(
      new Sprite({
        resource: image,
        position: new Vector2(0, -18), // -18px => au dessus de la tête du hero
      })
    );
    this.addChild(this.itemPickupShell);
  }

  workOnItemPickup(delta) {
    this.itemPickupTime -= delta;
    this.body.animations.play("pickUpDown");

    // A la fin de l'animation, supprime la copie de l'objet tenue au dessus de la tête du héro
    if (this.itemPickupTime <= 0) {
      this.itemPickupShell.destroy();
    }
  }
}
