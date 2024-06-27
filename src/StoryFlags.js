class StoryFlags {
  constructor() {
    this.flags = new Map();
  }

  /**
   *
   * @param {String} flag
   */
  add(flag) {
    this.flags.set(flag, true);
  }

  getRelevantScenario(scenarios = []) {
    return scenarios.find((scenario) => {
      // Check si il y a des bypass flags
      const bypassFlags = scenario.bypass ?? [];
      for (let i = 0; i < bypassFlags.length; i++) {
        const thisFlag = bypassFlags[i];
        // Si on a un des bypass de this.flags => return false
        if (this.flags.has(thisFlag)) {
          return false;
        }
      }

      // Check si il manque un flag requis
      const requiredFlags = scenario.requires ?? [];
      for (let i = 0; i < requiredFlags.length; i++) {
        const thisFlag = requiredFlags[i];
        // Si on a aucun flag de this.flags => return false
        if (!this.flags.has(thisFlag)) {
          return false;
        }
      }

      // Si on passe les checks, le scenario est pertinent
      return true;
    });
  }
}

export const TALKED_TO_A = "TALKED_TO_A";
export const TALKED_TO_B = "TALKED_TO_B";

export const storyFlags = new StoryFlags();
