"use strict";

class Player
{
  #type;
  #shipAmount;

  constructor(type)
  {
    this.#type = type;
    this.#shipAmount = 0;
  }

  shoot()
  {

  }

  increaseShipAmount()
  {
    this.#shipAmount++;
  }

  decreaseShipAmount()
  {
    this.#shipAmount > 0 ? this.#shipAmount-- : this.#shipAmount = 0;
  }
}
