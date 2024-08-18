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

    const rod = new Rod(gridCells(7), gridCells(3));
    this.addChild(rod);

    const npc1 = new Npc(gridCells(8), gridCells(5), {
      content: [
        //Texte n°3
        {
          string: "... J'en peux plus de ce type.", // Contenu textbox
          requires: [TALKED_TO_B], // Story flags requis pour le déclenchement (ex ["TALKED_TO_A", "TALKED_TO_B", ...]).
          bypass: [TALKED_TO_A], // Story flags qui empêchent le déclenchement (ex, HERO_LOOT_SWORD => pas besoin de lui dire qu'il peut loot une épée..)
          addsFlag: TALKED_TO_A,
        },
        //Texte n°2
        {
          string: "C'est le pire collegue que j'ai jamais eu!",
          requires: [TALKED_TO_A],
          bypass: [],
          addsFlag: TALKED_TO_A,
        },
        //Texte n°1
        {
          string:
            "Du travail, encore du travail... Oh! Je ne t'avais pas vu, bienvenue a la mine!",
          requires: [],
        },
      ],
      portraitFrame: 1,
    });
    this.addChild(npc1);

    const npc2 = new Npc(gridCells(12), gridCells(3), {
      content: [
        {
          string:
            "Travailler dans une mine, c'est pas facile... Surtout avec un collegue aussi feneant...",
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
      portraitFrame: 1,
    });
    this.addChild(npc2);

    this.walls = new Set();

    // Walls exterieurs
    // => haut
    this.walls.add(`32,0`);
    this.walls.add(`48,0`);
    this.walls.add(`64,0`);
    this.walls.add(`80,0`);
    this.walls.add(`96,0`);
    this.walls.add(`112,0`);
    this.walls.add(`128,0`);
    this.walls.add(`144,0`);
    this.walls.add(`160,0`);
    this.walls.add(`176,0`);
    this.walls.add(`192,0`);
    this.walls.add(`208,0`);
    this.walls.add(`224,0`);
    this.walls.add(`240,0`);
    this.walls.add(`256,0`);
    this.walls.add(`272,0`);

    // => gauche
    this.walls.add(`16,16`);
    this.walls.add(`16,32`);
    this.walls.add(`16,48`);
    this.walls.add(`16,64`);
    this.walls.add(`16,80`);
    this.walls.add(`16,96`);
    this.walls.add(`16,112`);

    // => bas
    this.walls.add(`32,128`);
    this.walls.add(`48,128`);
    this.walls.add(`64,128`);
    this.walls.add(`80,128`);
    this.walls.add(`96,128`);
    this.walls.add(`112,128`);
    this.walls.add(`128,128`);
    this.walls.add(`144,128`);
    this.walls.add(`160,128`);
    this.walls.add(`176,128`);
    this.walls.add(`192,128`);
    this.walls.add(`208,128`);
    this.walls.add(`224,128`);
    this.walls.add(`240,128`);
    this.walls.add(`256,128`);
    this.walls.add(`272,128`);

    // => droite
    this.walls.add(`288,16`);
    this.walls.add(`288,32`);
    this.walls.add(`288,48`);
    this.walls.add(`288,64`);
    this.walls.add(`288,80`);
    this.walls.add(`288,96`);
    this.walls.add(`288,112`);

    // blocks
    this.walls.add(`48,16`);
    this.walls.add(`64,16`);
    this.walls.add(`80,48`);
    this.walls.add(`96,48`);
    this.walls.add(`96,64`);
    this.walls.add(`112,64`);
    this.walls.add(`128,48`);
    this.walls.add(`192,80`);
    this.walls.add(`208,80`);
    this.walls.add(`224,96`);

    // rochers
    this.walls.add(`144,16`);
    this.walls.add(`192,32`);
    this.walls.add(`208,32`);
    this.walls.add(`208,48`);
    this.walls.add(`256,80`);

    // eau
    this.walls.add(`96,96`);
    this.walls.add(`112,96`);
    this.walls.add(`128,96`);

    this.walls.add(`176,96`);
    this.walls.add(`192,96`);
    this.walls.add(`208,96`);
    this.walls.add(`240,32`);
    this.walls.add(`256,32`);
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
