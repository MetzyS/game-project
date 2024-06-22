class Events {
  callbacks = [];
  nextId = 0;

  // emit event
  //   on(eventName, ..., callback) => emit si stored.eventName === eventName => callback (on)
  emit(eventName, value) {
    this.callbacks.forEach((stored) => {
      stored.eventName === eventName && stored.callback(value);
    });
  }

  // subscribe to something happening
  //   exemple: heroMoveEvent, pokeballOnTheGround, pickupPokeball
  on(eventName, caller, callback) {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });
    // sauvegarde l'evenement @ callbacks avec un Id pour qu'on sache ce qui s'est passé
    return this.nextId;
  }
  // remove subscription
  off(id) {
    // retire un evenement sauvegardé dans callbacks via son id (filter)
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
  }

  //   Evite memory leak, exemple: un objet au sol (caller) "is listening to an event (heroWalk)", une fois que l'event est passé, l'objet n'existera plus au sol et donc n'aura plus besoin de "listen". Ca évite a ce qu'on ait trop d'entitées qui n'existent plus et qui attendent(listen) un event.
  unsubscribe(caller) {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller
    );
  }
}

export const events = new Events();
