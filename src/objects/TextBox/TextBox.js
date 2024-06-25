import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class TextBox extends GameObject {
  constructor() {
    super({
      position: new Vector2(32, 112),
    });
    this.content =
      "Salut, ça va ? Salut, ça va ? Salut, ça va ? Salut, ça va ?";

    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  // Override de la methode drawImage
  drawImage(ctx, drawPosX, drawPosY) {
    // draw le backdrop en 1er (l'image du rectangle..)
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // draw le texte par dessus
    // + style & paramètres texte
    ctx.font = "12px fontRetroGaming";
    ctx.textAlign = "left";
    ctx.baseLine = "top";
    ctx.fillStyle = "#fff";

    const MAX_WIDTH = 250;
    const LINE_HEIGHT = 20;
    const PADDING_LEFT = 10;
    const PADDING_TOP = 20;

    // split le texte a draw pour créer plusieurs lignes et éviter l'overflow
    let words = this.content.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine); // measureText = methode du context qui permet de mesurer la taille du texte en px
      let testWidth = metrics.width;

      // Si la ligne de test (testLine) est + grande que MAX_WIDTH et n'est pas le premier mot..
      if (testWidth > MAX_WIDTH && n > 0) {
        ctx.fillText(line, drawPosX + PADDING_LEFT, drawPosY + PADDING_TOP);
        // Reset la ligne
        line = words[n] + " ";
        drawPosY += LINE_HEIGHT; // Ajoute de l'espace entre les lignes
      } else {
        line = testLine;
      }
    }

    // methode context params: fillText(texte, position x, position y)
    ctx.fillText(line, drawPosX + PADDING_LEFT, drawPosY + PADDING_TOP);
  }
}
