"use strict";

class Gamefield
{
  constructor(size, type)
  {
    this.size = size;
    this.type = type;
  }

  draw()
  {
    const field = document.getElementById(this.type);
    const topLine = document.createElement("tr");
    field.appendChild(topLine);

    let name = " ";
    for (let i = 0; i <= this.size; i++)
    {
      const topCell = document.createElement("th");
      if (i > 0)
      {
        name = String.fromCharCode(i + 96);
      }
      const topCellName = document.createTextNode(name);
      topLine.appendChild(topCell);
      topCell.appendChild(topCellName);
    }
  }
}
