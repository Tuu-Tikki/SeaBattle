"use strict";

class Ship
{
  constructor(size, direction)
  {
    this.size = size;
    this.direction = direction;
    this.health = size;
    placeOnBar();
  }

  decreaseHealth()
  {
    if (this.health > 0) { this.health--; }
  }

  drag()
  {

  }

  drop()
  {

  }

  #placeOnBar()
  {

  }

}
