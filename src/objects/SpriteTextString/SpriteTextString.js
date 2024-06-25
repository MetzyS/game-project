import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { getCharacterFrame, getCharacterWidth } from "./spriteFontMap";

export class SpriteTextString extends GameObject {
  constructor(str) {
    super({
      position: new Vector2(32, 110), // En bas de l'écran
    });
    const content = str ?? "Texte par défaut";

    // Array avec les mots de "content"
    this.words = content.split(" ").map((word) => {
      // Valeur de la largeur (en px) du mot
      let wordWidth = 0;

      // Break chaque mot en lettres
      const chars = word.split("").map((char) => {
        // Mesure la largeur de chaque lettre
        const charWidth = getCharacterWidth(char);

        // Ajoute la largeur de chaque lettre à la taille totale du mot
        wordWidth += charWidth;

        // Crée un Sprite pour chaque lettre du mot
        return {
          width: charWidth,
          sprite: new Sprite({
            resource: resources.images.fontWhite,
            hFrames: 13, // spreadsheet = 13 frames horizontal
            vFrames: 6, // spreadsheet = 6 frames vertial
            frame: getCharacterFrame(char),
          }),
        };
      });

      // Return la largeur + la liste des lettres de chaque mot
      return {
        wordWidth,
        chars,
      };
    }); // séparation du texte en array ["mot1", "mot2"]..

    // backdrop (rectangle)
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(ctx, drawPosX, drawPosY) {
    // Draw le backdrop (rectangle)
    this.backdrop.drawImage(ctx, drawPosX, drawPosY);

    // Configuration du style du texte
    const PADDING_LEFT = 7;
    const PADDING_TOP = 7;
    const LINE_WIDTH_MAX = 240;
    const LINE_VERTICAL_HEIGHT = 14;

    // Position initale du curseur
    let cursorX = drawPosX + PADDING_LEFT;
    let cursorY = drawPosY + PADDING_TOP;

    this.words.forEach((word) => {
      word.chars.forEach((char) => {
        const { sprite, width } = char;

        const withCharOffset = cursorX - 5; // retire l'espace vide autour des lettres (5px environ)
        sprite.draw(ctx, withCharOffset, cursorY);

        // Ajoute la largeur de la lettre au positionnement du curseur
        cursorX += width;

        // Ajoute 1px d'espace entre les lettres
        cursorX += 1;
      });

      //Déplace le curseur (ajoute un espace de 3px entre chaque mot)
      cursorX += 3;
    });
  }
}
