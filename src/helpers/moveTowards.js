export function moveTowards(person, destinationPosition, speed) {
  // variables distance x/y entre position actuelle et destination (ou on veut aller - ou on est)
  let distanceToTravelX = destinationPosition.x - person.position.x;
  let distanceToTravelY = destinationPosition.y - person.position.y;

  // **2 = Exponentiation (puissance) exemple: 3 ** 4 = 81 = 3^4
  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

  if (distance <= speed) {
    //on est arrivé à destination
    person.position.x = destinationPosition.x;
    person.position.y = destinationPosition.y;
  } else {
    // on est pas encore arrivé => on se déplace vers la destination à la vitesse spécifiée par "speed"
    let normalizedX = distanceToTravelX / distance;
    let normalizedY = distanceToTravelY / distance;

    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    // Recalcul de la distance manquante après le mouvement (la gameloop repète la fonction)
    distanceToTravelX = destinationPosition.x - person.position.x;
    distanceToTravelY = destinationPosition.y - person.position.y;
    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }

  return distance;
}
