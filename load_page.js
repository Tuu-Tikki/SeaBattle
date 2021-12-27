"use strict";

//const classnamePlayerFieldCell = "player_cell";

function isField(table_id) {
  const table = document.getElementById(table_id);
  const cells = table.getElementsByTagName('th');
  return cells.length > 0;
}

function isFieldPlace(table_id) {
  const table = document.getElementById(table_id);
  return table != null;
}

function createField(table_id) {
  
  let result = isFieldPlace(table_id) && !isField(table_id);
  
  return result;

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

