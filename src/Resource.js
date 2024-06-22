class Resources {
  constructor() {
    // assets a charger que le jeu utilise
    this.toLoad = {
      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",
      hero: "/sprites/hero-sheet.png",
      shadow: "/sprites/shadow.png",
    };

    // bucket pour tout les assets
    this.images = {};

    // chargement de chaque asset
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];

      // On garde un suivi de ce qu'on a chargé et de si ça a été bien chargé ou non
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

// Création de l'instance
export const resources = new Resources();
