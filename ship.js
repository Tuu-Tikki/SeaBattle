"use strict";

class Ship
{
  #size;
  #direction;
  #health;

  constructor(size, direction)
  {
    this.#size = size;
    this.#direction = direction;
    this.#health = size;
  }

  decreaseHealth()
  {
    this.#health > 0 ? this.#health-- : this.#health = 0;
  }
}
