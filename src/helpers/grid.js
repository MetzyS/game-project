// Pour la création d'un "grid" de la map, chaque cell sera de 16px * 16px
// Ca permettra a ce que les déplacements du personnage se fasse de cell en cell
// Ca permettra également a setup les collisions

/**
 * Calcul taille cell
 * @param {number} n
 * @returns
 */
export const gridCells = (n) => {
  return n * 16;
};

/**
 * Collisions
 * @param {Set} walls
 * @param {number} x
 * @param {number} y
 * @returns
 */
export const isSpaceFree = (walls, x, y) => {
  const str = `${x},${y}`;
  // Check si ya un wall (aux coordonnées x,y) dans walls{}
  const isWallPresent = walls.has(str);

  return !isWallPresent;
};
