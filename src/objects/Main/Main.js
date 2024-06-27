import { Camera } from "../../Camera";
import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { Input } from "../../Input";
import { storyFlags } from "../../StoryFlags";
import { Inventory } from "../Inventory/Inventory";
// import { TextBox } from "../TextBox/TextBox";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString";

/**
 * Scene principale (root, coeur du jeu) dans laquelle tout les évenements sont gérés => affichage des GameObjects (levels, hero, inventory...), gestion des Inputs, gestion de la Camera...
 */
export class Main extends GameObject {
  constructor() {
    super({});
    this.level = null; // Niveau (sprite image)
    this.input = new Input(); // Ajout des inputs
    this.camera = new Camera(); // Caméra
  }

  ready() {
    const inventory = new Inventory(); // Inventaire
    this.addChild(inventory);

    console.log("CHANGE_LEVEL", this);
    // Listen l'event "CHANGE_LEVEL" et fait passer le paramètre newLevelInstance à this.setLevel (pour changer de niveau)
    events.on("CHANGE_LEVEL", this, (newLevelInstance) => {
      this.setLevel(newLevelInstance);
    });

    // Lance la textbox
    events.on("HERO_REQUESTS_ACTION", this, (withObject) => {
      // verifie si l'obj avec lequel on interragis existe
      if (typeof withObject.getContent === "function") {
        // recupère le contenu a afficher (texte) + le portrait (si portrait il y a)
        const content = withObject.getContent();
        // console.log(content);
        // Si il n'y a pas de contenu, return
        if (!content) {
          return;
        }

        // Ajout potentiel d'un story flag
        if (content.addsFlag) {
          console.log("ADDS FLAG:", content.addsFlag, " => ", content);
          storyFlags.add(content.addsFlag);
        }

        // Affiche la textbox + portrait
        // this.textbox = new TextBox(); // Ancienne méthode (avec fichier TTF)
        const textbox = new SpriteTextString({
          portraitFrame: content.portraitFrame,
          string: content.string,
        });
        this.addChild(textbox);
        events.emit("START_TEXT_BOX");

        // Attends de recevoir l'event END_TEXT_BOX, supprime la text box et unsubscribe (ne listen plus) "END_TEXT_BOX" (pour éviter les memory leaks)
        const endingSub = events.on("END_TEXT_BOX", this, () => {
          textbox.destroy();
          events.off(endingSub);
        });
      }
    });
  }

  /**
   * Setter pour le chargement des niveaux
   * @param {Level} newLevelInstance
   */
  setLevel(newLevelInstance) {
    // Si on est déjà dans un niveau, on le clear pour pouvoir le remplacer (evite les memory leaks a cause des "listening to events" et si on ne fait pas ça, on aurait plusieurs levels en même temps)
    if (this.level) {
      this.level.destroy();
    }

    // modif this.level => level donné en paramètre
    this.level = newLevelInstance;
    this.addChild(this.level);
  }

  /**
   * Affiche le background (ciel, inventaire..)
   * Position du sprite à 0,0 pour éviter qu'il ne bouge avec la caméra
   * @param {CanvasContext} ctx
   */
  drawBackground(ctx) {
    // Si un level exite, on l'affiche
    this.level?.background.drawImage(ctx, 0, 0);
  }

  /**
   * Affiche les objets (hero, objets au sol, exits...)
   * @param {CanvasContext} ctx
   */
  drawObjects(ctx) {
    this.children.forEach((child) => {
      if (child.drawLayer !== "HUD") {
        child.draw(ctx, 0, 0);
      }
    });
  }

  /**
   * Affiche le foreground (niveau, inventaire...)
   * @param {CanvasContext} ctx
   */
  drawForeground(ctx) {
    // Affiche les évenements du layer "HUD"
    this.children.forEach((child) => {
      if (child.drawLayer === "HUD") {
        child.draw(ctx, 0, 0);
      }
    });
  }
}
