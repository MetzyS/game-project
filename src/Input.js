export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export class Input {
  constructor() {
    // heldDirections permettra d'appuyer simultannément sur plusieurs touches directionnelles, sans que le jeu oublies celle qui a été enfoncée en premier
    // on va l'appeller la "queue"
    this.heldDirections = [];

    //
    this.keys = {};
    this.lastKeys = {};

    // eventlisteners pour diriger le hero keydown et keyup
    document.addEventListener("keydown", (e) => {
      this.keys[e.code] = true; // touche e.code enfoncée => true
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onArrowPressed(UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onArrowPressed(DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onArrowPressed(LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onArrowPressed(RIGHT);
      }
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.code] = false; // touche e.code relachée = false
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onArrowReleased(UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onArrowReleased(DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onArrowReleased(LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onArrowReleased(RIGHT);
      }
    });
  }

  get direction() {
    return this.heldDirections[0]; // peut être undefined si aucune touche est appuyée
  }

  // appelée chaque frame, pas besoin de tracker le delta
  update() {
    // Check a chaque frame pour savoir si il y a de nouvelles inputs pressées par l'utilisateur
    this.lastKeys = { ...this.keys };
  }

  // Logique de vérification pour savoir si une touche est enfoncée ou juste pressée une fois
  getActionJustPressed(keyCode) {
    let justPressed = false;
    if (this.keys[keyCode] && !this.lastKeys[keyCode]) {
      justPressed = true;
    }
    return justPressed;
  }

  onArrowPressed(direction) {
    // Ajoute la direction à la "queue" si elle n'y est pas déjà
    if (this.heldDirections.indexOf(direction) === -1) {
      this.heldDirections.unshift(direction);
    }
  }

  onArrowReleased(direction) {
    const index = this.heldDirections.indexOf(direction);
    if (index === -1) {
      // -1 = elle n'existe pas dans la queue
      return;
    }
    // Retire la direction de la "queue"
    this.heldDirections.splice(index, 1);
  }
}
