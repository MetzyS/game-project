import { Vector2 } from "./Vector2";

export class Sprite {
  constructor({
    resource, // l'image que l'on veut afficher
    frameSize, // taille du découpage de l'image (car une image peut contenir plusieurs modèles ex: hero-sheet)
    hFrames, // horizontal (permet de spécifier comment le sprite sheet est construit ex: hero-sheet = 8 horizontal x 3 vertical = 24 frames)
    vFrames, // vertical...
    frame, // le frame que l'on veut afficher
    scale, // taille de ce que l'on veut afficher
    position, // ou on veut l'afficher
  }) {
    // On sauvegarde chaque paramètre donné
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16); // taille de la frame (au cas ou dans le sprite sheet il y ait des frames + grandes que les autres ex: batiments...), par défaut 16px*16px
    this.hFrames = hFrames ?? 1; // ?? 1 = si nul, alors default 1.
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map(); // On crée un grid vide qui contiendra les frames du sprite sheet
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.buildFrameMap(); // Ligne 24
  }

  // Fonction pour créer la frameMap
  buildFrameMap() {
    let frameCount = 0;
    // On itère pour chaque colonne (vertical)
    for (let v = 0; v < this.vFrames; v++) {
      // Dans chaque colonne on itère chaque lignes (horizontal)
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        ); // On spécifie bien la frameSize pour être sur que la frame souhaitée soit en entier
        frameCount++;
      }
    }
  }

  drawImage(ctx, x, y) {
    // Si l'image n'est pas encore chargée, on return (on fait rien)
    if (!this.resource.isLoaded) {
      return;
    }

    // Trouver la bonne frame dans le sprite sheet
    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);

    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image, // instance de l'image que l'ont veut afficher
      frameCoordX,
      frameCoordY, // Top Y corner de la frame
      frameSizeX, // Découpage (crop) du sprite sheet (X)
      frameSizeY, // Découpage (crop) du sprite sheet (Y)
      x, // Ou est-ce qu'on place dans le canvas X default (0)
      y, // ... default (0)
      frameSizeX * this.scale, // Taille (scale) (X)
      frameSizeY * this.scale // Taille (scale) (Y)
    );
  }
}
