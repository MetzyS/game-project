import { events } from "../Events";
import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { TALKED_TO_A, TALKED_TO_B } from "../StoryFlags";
import { Vector2 } from "../Vector2";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { Npc } from "../objects/Npc/Npc";
import { Rod } from "../objects/Rod/Rod";
import { OutdoorLevel1 } from "./OutdoorLevel1";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(3), gridCells(6));

export class CaveLevel1 extends Level {
  constructor(params = {}) {
    super({});

    this.background = new Sprite({
      resource: resources.images.cave, // Image de la caverne
      frameSize: new Vector2(320, 180), // Toute la taille du canvas
    });

    // Ajout image sol
    const ground = new Sprite({
      resource: resources.images.caveGround,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(ground);

    // Ajout escaliers
    const exit = new Exit(gridCells(3), gridCells(5));
    this.addChild(exit);

    // Spawn le hero
    this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
    const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
    this.addChild(hero);

    const rod = new Rod(gridCells(9), gridCells(6));
    this.addChild(rod);

    const npc1 = new Npc(gridCells(5), gridCells(5), {
      // content: "Salut! Je suis un bon gros PNJ!",
      content: [
        //Texte n°2
        {
          string: "... Il faut que je retourne travailler, a plus", // Contenu textbox
          requires: [TALKED_TO_A], // Story flags requis pour le déclenchement (ex ["TALKED_TO_A", "TALKED_TO_B", ...]).
          bypass: [], // Story flags qui empêchent le déclenchement (ex, HERO_LOOT_SWORD => pas besoin de lui dire qu'il peut loot une épée..)
        },
        //Texte n°1
        {
          string: "Bienvenue dans la mine! Ici on bosse tres dur",
          requires: [],
          bypass: [],
          addsFlag: TALKED_TO_A,
        },
      ],
      portraitFrame: 1,
    });
    this.addChild(npc1);

    const npc2 = new Npc(gridCells(8), gridCells(5), {
      content: [
        {
          string: "Travailler dans une mine, c'est pas facile...",
          requires: [TALKED_TO_B],
          bypass: [],
        },
        {
          string:
            "Hey! Je t'ai jamais vu dans le coin auparavant, moi c'est Billy!",
          requires: [],
          bypass: [],
          addsFlag: TALKED_TO_B,
        },
      ],
      portraitFrame: 0,
    });
    this.addChild(npc2);

    this.walls = new Set();
  }

  ready() {
    events.on("HERO_EXITS", this, () => {
      console.log("HERO_EXITS", this);
      // Une fois que le hero marche sur l'exit point (escaliers), on emmet un signal "CHANGE_LEVEL" et Main (root scene) s'occupera du reste
      events.emit(
        "CHANGE_LEVEL",
        new OutdoorLevel1({
          heroPosition: new Vector2(gridCells(7), gridCells(3)),
        })
      );
    });
  }
}
