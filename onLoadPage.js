"use strict";

function onLoadPage()
{
  const size = 10;

  const playerGamefield = new Gamefield(size, "player");
  playerGamefield.draw();

  const aiGamefield = new Gamefield (size, "ai");
  aiGamefield.draw();
}
