"use strict";

class Gamefield
{
  #size;
  #type;

  constructor(size, type)
  {
    this.#size = size;
    this.#type = type;
  }

  isPlaceForItExist()
  {
    const gamefieldTable = document.getElementById(this.#type);

    if(gamefieldTable != null) { return gamefieldTable.tagName == "TABLE" ? true : false; }

    return false;
  }

  isDrawn()
  {
    if(this.isPlaceForItExist()) { return document.getElementById(this.#type).rows.length == this.#size + 1 ? true : false; }

    return false;
  }

  draw()
  {
    if(this.isPlaceForItExist() && !this.isDrawn())
    {
      const field = document.getElementById(this.#type);

      for (let i = 0; i <= this.#size; i++)
      {
        const row = document.createElement("tr");
        field.appendChild(row);

        for (let j = 0; j <= this.#size; j++)
        {
          let cell;
          let header;

          if (i == 0)
          {
            let columnHeader = " ";
            j == 0 ? " " : columnHeader = String.fromCharCode(j + 96);
            header = document.createTextNode(columnHeader);
            cell = document.createElement("th");
          }
          else
          {
            let rowHeader = " ";
            j == 0 ? rowHeader = i : " ";
            header = document.createTextNode(rowHeader);
            j > 0 ? cell = document.createElement("td") : cell = document.createElement("th");
          }

          row.appendChild(cell);
          cell.appendChild(header);
        }
      }
    }
  }
}
