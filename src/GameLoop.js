export class GameLoop {
  constructor(update, render) {
    // On track le temps passé pour savoir quand on passe a la prochaine frame (framerate)
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60; // 1000 = 1sec donc 60 fps

    this.update = update;
    this.render = render;

    this.rafId = null; // rafId = Request Animation Frame Id, ça nous permet de reprendre à une frame spécifique (en cas de pause par exemple)
    this.isRunning = false; // track si la game loop est en cours ou si elle est en pause/arrêtée
  }

  mainLoop = (timestamp) => {
    if (!this.isRunning) return;

    // deltaTime = how much time has passed
    let deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // accumule le temps passé depuis la frame précédente
    this.accumulatedTime += deltaTime;

    // Le step entre chaque frame sera fixe
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep); // Ici on fixe le step voulu (fps)
      this.accumulatedTime -= this.timeStep;
    }

    // Render
    this.render();

    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.isRunning) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}
