// Largeur (WIDTHS) de chaque lettre (sheet font png)
const DEFAULT_WIDTH = 5;
const width = new Map();

// Ajout des overrides (certaines lettres sont +/- larges que d'autres)
width.set("c", 4); // => c = 4px de large...
width.set("f", 4);
width.set("i", 2);
width.set("j", 4);
width.set("l", 3);
width.set("n", 4);

width.set("r", 4);
width.set("t", 4);
width.set("u", 4);
width.set("v", 4);
width.set("x", 4);
width.set("y", 4);
width.set("z", 4);

width.set("E", 4);
width.set("F", 4);
width.set("M", 7);
width.set("W", 7);

width.set(" ", 3);
width.set("'", 1);
width.set("!", 1);

export const getCharacterWidth = (char) => {
  // permet de get la taille de la lettre (char) souhaité
  return width.get(char) ?? DEFAULT_WIDTH;
};

// Frames de chaque lettre

const frameMap = new Map();
// .join.split => join les strings pour avoir une seul enorme string puis split l'enorme string en array de lettres individuels "a", "b"...
[
  "abcdefghijklmnopqrstuvwxyz",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "0123456789 __",
  ".!-,?'",
]
  .join("")
  .split("")
  .forEach((char, index) => {
    // Populate frameMap => {"a" = 0, "b" = 1}...
    // la clé = la lettre voulu pour pouvoir avoir la position dans le spreadsheet automatiquement (traduction du texte => positions)
    frameMap.set(char, index);
  });

export const getCharacterFrame = (char) => {
  return frameMap.get(char) ?? 0;
};
