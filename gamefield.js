"use strict";

class Gamefield()
{
  constructor(size, type)
  {
    this.size = size;
    this.type = type;
  }

  draw()
  {

  }
}

class Cell()
{
  constructor(coordinates)
  {
    this.coordinates = coordinates;
    this.firedUpon = UNSHOT;
  }
}

function createField(table_id) {

  //let result = isFieldPlaceExists(table_id) && !isFieldExists(table_id);

    let element = document.getElementById(table_id);
    let result = isProperField(element);

    return result;


  //return result;

  // let created = false;
  //
  // const player_field = document.getElementById("player");
  // const top_line = document.createElement("tr");
  // player_field.appendChild(top_line);
  //
  // let name = " ";
  // for (let i = 0; i < 11; i++)
  // {
  //   const top_cell = document.createElement("th");
  //   if (i > 0)
  //   {
  //     name = String.fromCharCode(i + 96);
  //   }
  //   const top_cell_name = document.createTextNode(name);
  //   top_line.appendChild(top_cell);
  //   top_cell.appendChild(top_cell_name);
  // }
  //
  // return created;
}
