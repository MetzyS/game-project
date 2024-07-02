import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Inventory extends GameObject {
  constructor() {
    super({
      position: new Vector2(0, 1),
    });

    this.isOpen = false;

    this.drawLayer = "HUD";

    this.nextId = 0;

    this.items = [
      {
        id: -1, // -1 et -2 sont des fake ids pour tester l'inventaire avant de ramasser des items
        image: resources.images.rod,
      },
      {
        id: -2,
        image: resources.images.rod,
      },
    ];

    // Reaction à l'event "PICKS_UP_ITEM"
    events.on("HERO_PICKS_UP_ITEM", this, (data) => {
      console.log("HERO_PICKS_UP_ITEM", this);
      // affichage de l'item ramassé dont les infos sont donnés en paramètres (data)
      //   Pour afficher les items, on les ajoute a "this.items=[]" qui correspond à l'inventaire
      this.nextId += 1; // On commence par créer l'ID de l'item ramassé dans l'inventaire (ids => ordre de ramassage)
      this.items.push({
        id: this.nextId,
        image: resources.images.rod,
      });
      this.renderInventory();
    });

    // test suppression item inventaire => removeFromInventory(id)
    // setTimeout(() => {
    //   this.removeFromInventory(-2);
    // }, 2000);

    // affichage initial de l'inventaire
    this.renderInventory();
  }

  renderInventory() {
    // supprime les données (qui seront obsolètes) de l'inventaire
    this.children.forEach((child) => child.destroy());

    // affiche les nouvelles données de l'inventaire
    this.items.forEach((item, index) => {
      if (this.isOpen) {
        const sprite = new Sprite({
          resource: item.image,
          position: new Vector2(index * 12, 0), // séparation des items de 8px dans l'affichage de l'inventaire
        });
        this.addChild(sprite);
      }
    });
  }

  removeFromInventory(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }

  toggleInventory() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderInventory();
      return;
    }
    this.removeFromInventory();
    return;
  }
}
