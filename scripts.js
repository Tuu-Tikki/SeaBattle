"use strict";
//i want to make a footer stay at the bottom, but not cover the other elements when the window is minimized
setFooter();

window.onresize = setFooter;

function setFooter() {
  const window_height = window.innerHeight;
  const footer = document.querySelector(".footer");
  footer.style.top = Math.max(window_height - 130, 800) + "px";
}

//here is the part to show the messages
const message_box = document.getElementById("message_box");
const close_btn = document.getElementsByClassName("close")[0];
let message_text = document.getElementById("text");

function showMessage(text) {
  message_text.innerHTML = text;
  message_box.style.display = "block";
}

function closeMessage(event) {
  if (message_box == event.target || close_btn == event.target) {
  message_box.style.display = "none";
  }
}

//to control the status of game
//At the beginning und after finish both are false
//preparation: set_game=true, game_on= false
//game in process: set_game=false, game_on=true
let set_game = false;
let game_on = false;

//to control how much ships were hit
let ship_AI_hit = 0;
let ship_player_hit = 0;

//preparation for a new game
function setGame() {
  set_game = true;
  game_on = false;
  ship_AI_hit = 0;
  ship_player_hit = 0;

//clear the game field for a new game
  const field_cells = document.querySelectorAll("td");

  for (let i = 0; i < field_cells.length; i++) {

    field_cells[i].style.removeProperty("background-color");

    field_cells[i].className = "free";
  }

//turn on a highlight for a player field and turn off for an ai field
  setHighlight(true, false);

//to fill the ai field with ships
  setShipsAI();
}

function setShipsAI() {
  let ship_4 = 4;
  let ship_3 = 3;
  let ship_2 = 3;
  let ship_1 = 4;

  let ship_next;
  let available_cells;

  let cells_ai = document.querySelectorAll(".right .free");
  let free_cells = cells_ai.length;

  let ship_cell_number = Math.floor(Math.random() * free_cells);
  let ship_cell = cells_ai[ship_cell_number];

  //ship_4
  ship_cell.className = "ship_ai ship41";
  ship_4--;

  while (ship_4 > -1) {
    available_cells = availableCellAi(ship_cell);

    if (ship_4 > 0) {
      let direction_choose = Math.floor(Math.random() * available_cells.length);
      ship_next = available_cells[direction_choose];
      ship_next.className = "ship_ai ship41";
      ship_cell = ship_next;
    }
    else {
       for (let i = 0; i < available_cells.length; i++) {
         available_cells[i].className = "border_zone_ai";
       }
    }
    ship_4--;
  }

  //ship_3
  for (let i = 1; i < 3; i++) {
    ship_3 = 3;
    cells_ai = document.querySelectorAll(".right .free");
    free_cells = cells_ai.length;
    ship_cell_number = Math.floor(Math.random() * free_cells);
    ship_cell = cells_ai[ship_cell_number];
    ship_cell.className = "ship_ai ship3" + i;
    ship_3--;

    while (ship_3 > -1) {
      available_cells = availableCellAi(ship_cell);

      if ("" == available_cells.length) {
        const ship_cells = document.querySelectorAll(ship_cell.className);
        switch (ship_3)  {
          case 2:
            ship_cells[0].className = "ship_ai ship1" + ship_1;
            ship_1--;
            ship_3 = -1;
            break;
          case 1:
            for (let i = 0; i < ship_cells.length; i++) {
              ship_cells[i].className = "ship_ai ship2" + ship_2;
            }
            ship_2--;
            ship_3 = -1;
            break;
        }
      }
      else {
        if (ship_3 > 0) {
          let direction_choose = Math.floor(Math.random() * available_cells.length);
          ship_next = available_cells[direction_choose];
          ship_next.className = "ship_ai ship3" + i;
          ship_cell = ship_next;
        }
        else {
           for (let i = 0; i < available_cells.length; i++) {
             available_cells[i].className = "border_zone_ai";
           }
        }
        ship_3--;
      }
    }
  }

  //ship_2
  for (let i = ship_2; i > 0; i--)  {
    cells_ai = document.querySelectorAll(".right .free");
    free_cells = cells_ai.length;
    ship_cell_number = Math.floor(Math.random() * free_cells);
    ship_cell = cells_ai[ship_cell_number];
    ship_cell.className = "ship_ai ship2" + i;

    let ship_cell_2 = 1;

    while (ship_cell_2 > -1) {
      available_cells = availableCellAi(ship_cell);

      if ("" == available_cells.length) {
        ship_cell.className = "ship_ai ship1" + ship_1;
        ship_1--;
        ship_cell_2 = -1;
      }
      else {
        if (ship_cell_2 > 0) {
          let direction_choose = Math.floor(Math.random() * available_cells.length);
          ship_next = available_cells[direction_choose];
          ship_next.className = "ship_ai ship2" + i;
          ship_cell = ship_next;
        }
        else {
           for (let i = 0; i < available_cells.length; i++) {
             available_cells[i].className = "border_zone_ai";
           }
        }
        ship_cell_2--;
      }
    }
  }

  //ship_1
  for (let i = ship_1; i > 0; i--)  {
    cells_ai = document.querySelectorAll(".right .free");
    free_cells = cells_ai.length;
    ship_cell_number = Math.floor(Math.random() * free_cells);
    ship_cell = cells_ai[ship_cell_number];
    ship_cell.className = "ship_ai ship1" + i;

    available_cells = availableCellAi(ship_cell);
    for (let i = 0; i < available_cells.length; i++) {
      available_cells[i].className = "border_zone_ai";
    }
  }

  let border_cell = document.querySelectorAll(".border_zone_ai");
  for (let i = 0; i < border_cell.length; i++) {
    border_cell[i].className = "free";
  }
}

function setShip() {
  if(!set_game) {return ;}

  if (20 == document.querySelectorAll(".ship").length) {
    showMessage("You set all ships. Click 'Start game' to start the game.");

    const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) { player_cells_light_off.id = "player"; }

    return;
  }

  const element_under_mouse = document.querySelectorAll(":hover");
  const cell = element_under_mouse[element_under_mouse.length-1];

  let ship41_cell_amount = document.querySelectorAll("._41").length;
  let ship31_cell_amount = document.querySelectorAll("._31").length;
  let ship32_cell_amount = document.querySelectorAll("._32").length;
  let ship21_cell_amount = document.querySelectorAll("._21").length;
  let ship22_cell_amount = document.querySelectorAll("._22").length;
  let ship23_cell_amount = document.querySelectorAll("._23").length;
  let ship11_cell_amount = document.querySelectorAll("._11").length;
  let ship12_cell_amount = document.querySelectorAll("._12").length;
  let ship13_cell_amount = document.querySelectorAll("._13").length;
  let ship14_cell_amount = document.querySelectorAll("._14").length;

  if ("free" == cell.className && 0 == ship41_cell_amount) {
    const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) { player_cells_light_off.id = "player"; }

    cell.className = "ship _41";

    availableShipCell(cell);
  }
  else if ("availbale_ship_cell" == cell.className && ship41_cell_amount < 4) {
    cell.className = "ship _41";
    availableShipCell(cell);

    if (4 == document.querySelectorAll("._41").length) {
      const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
      for (let i = 0; i < availbale_ship_cell.length; i++) {
        availbale_ship_cell[i].className = "border_zone";
      }

      const player_cells_light_on = document.getElementById("player");
      if (null != player_cells_light_on) { player_cells_light_on.id = "player_set"; }
    }
  }

  else if ("free" == cell.className && 0 == ship31_cell_amount && 4 == ship41_cell_amount) {
    const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) { player_cells_light_off.id = "player"; }

    cell.className = "ship _31";

    availableShipCell(cell);
  }
  else if ("availbale_ship_cell" == cell.className && ship31_cell_amount < 3) {
    cell.className = "ship _31";
    availableShipCell(cell);

    if (3 == document.querySelectorAll("._31").length) {
      const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
      for (let i = 0; i < availbale_ship_cell.length; i++) {
        availbale_ship_cell[i].className = "border_zone";
      }

      const player_cells_light_on = document.getElementById("player");
      if (null != player_cells_light_on) { player_cells_light_on.id = "player_set"; }
    }
  }

  else if ("free" == cell.className && 0 == ship32_cell_amount && 4 == ship41_cell_amount && 3 == ship31_cell_amount) {
    const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) { player_cells_light_off.id = "player"; }

    cell.className = "ship _32";

    availableShipCell(cell);
  }
  else if ("availbale_ship_cell" == cell.className && ship32_cell_amount < 3) {
    cell.className = "ship _32";
    availableShipCell(cell);

    if (3 == document.querySelectorAll("._32").length) {
      const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
      for (let i = 0; i < availbale_ship_cell.length; i++) {
        availbale_ship_cell[i].className = "border_zone";
      }

      const player_cells_light_on = document.getElementById("player");
      if (null != player_cells_light_on) { player_cells_light_on.id = "player_set"; }
    }
  }

  else if ("free" == cell.className && 0 == ship21_cell_amount && 4 == ship41_cell_amount && 3 == ship31_cell_amount
            && 3 == ship32_cell_amount) {
    const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) { player_cells_light_off.id = "player"; }

    cell.className = "ship _21";

    availableShipCell(cell);
  }
  else if ("availbale_ship_cell" == cell.className && ship21_cell_amount < 2) {
    cell.className = "ship _21";
    availableShipCell(cell);

    if (2 == document.querySelectorAll("._21").length) {
      const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
      for (let i = 0; i < availbale_ship_cell.length; i++) {
        availbale_ship_cell[i].className = "border_zone";
      }

      const player_cells_light_on = document.getElementById("player");
      if (null != player_cells_light_on) { player_cells_light_on.id = "player_set"; }
    }
  }

  else if ("free" == cell.className && 0 == ship22_cell_amount && 4 == ship41_cell_amount && 3 == ship31_cell_amount
            && 3 == ship32_cell_amount && 2 == ship21_cell_amount) {
    const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) { player_cells_light_off.id = "player"; }

    cell.className = "ship _22";

    availableShipCell(cell);
  }
  else if ("availbale_ship_cell" == cell.className && ship22_cell_amount < 2) {
    cell.className = "ship _22";
    availableShipCell(cell);

    if (2 == document.querySelectorAll("._22").length) {
      const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
      for (let i = 0; i < availbale_ship_cell.length; i++) {
        availbale_ship_cell[i].className = "border_zone";
      }

      const player_cells_light_on = document.getElementById("player");
      if (null != player_cells_light_on) { player_cells_light_on.id = "player_set"; }
    }
  }

  else if ("free" == cell.className && 0 == ship23_cell_amount && 4 == ship41_cell_amount && 3 == ship31_cell_amount
            && 3 == ship32_cell_amount && 2 == ship21_cell_amount && 2 == ship22_cell_amount) {
    const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) { player_cells_light_off.id = "player"; }

    cell.className = "ship _23";

    availableShipCell(cell);
  }
  else if ("availbale_ship_cell" == cell.className && ship23_cell_amount < 2) {
    cell.className = "ship _23";
    availableShipCell(cell);

    if (2 == document.querySelectorAll("._23").length) {
      const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
      for (let i = 0; i < availbale_ship_cell.length; i++) {
        availbale_ship_cell[i].className = "border_zone";
      }

      const player_cells_light_on = document.getElementById("player");
      if (null != player_cells_light_on) { player_cells_light_on.id = "player_set"; }
    }
  }

  else if ("free" == cell.className && 0 == ship11_cell_amount && 4 == ship41_cell_amount && 3 == ship31_cell_amount
            && 3 == ship32_cell_amount && 2 == ship21_cell_amount && 2 == ship22_cell_amount && 2 == ship23_cell_amount) {

    cell.className = "ship _11";

    availableShipCell(cell);

    const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
    for (let i = 0; i < availbale_ship_cell.length; i++) {
      availbale_ship_cell[i].className = "border_zone";
    }
  }

  else if ("free" == cell.className && 0 == ship12_cell_amount && 4 == ship41_cell_amount && 3 == ship31_cell_amount
            && 3 == ship32_cell_amount && 2 == ship21_cell_amount && 2 == ship22_cell_amount && 2 == ship23_cell_amount
            && 1 == ship11_cell_amount) {

    cell.className = "ship _12";

    availableShipCell(cell);

    const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
    for (let i = 0; i < availbale_ship_cell.length; i++) {
      availbale_ship_cell[i].className = "border_zone";
    }
  }

  else if ("free" == cell.className && 0 == ship13_cell_amount && 4 == ship41_cell_amount && 3 == ship31_cell_amount
            && 3 == ship32_cell_amount && 2 == ship21_cell_amount && 2 == ship22_cell_amount && 2 == ship23_cell_amount
            && 1 == ship11_cell_amount && 1 == ship12_cell_amount) {

    cell.className = "ship _13";

    availableShipCell(cell);

    const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
    for (let i = 0; i < availbale_ship_cell.length; i++) {
      availbale_ship_cell[i].className = "border_zone";
    }
  }

  else if ("free" == cell.className && 0 == ship14_cell_amount && 4 == ship41_cell_amount && 3 == ship31_cell_amount
            && 3 == ship32_cell_amount && 2 == ship21_cell_amount && 2 == ship22_cell_amount && 2 == ship23_cell_amount
            && 1 == ship11_cell_amount && 1 == ship12_cell_amount && 1 == ship13_cell_amount) {

    cell.className = "ship _14";

    availableShipCell(cell);

    const availbale_ship_cell = document.querySelectorAll(".availbale_ship_cell");
    for (let i = 0; i < availbale_ship_cell.length; i++) {
      availbale_ship_cell[i].className = "border_zone";
    }

    const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) { player_cells_light_off.id = "player"; }
  }

}

function startGame() {

  let ships_amount = 0;
  ships_amount = document.querySelectorAll(".ship").length;

  if (20 == ships_amount) {
    set_game = false;
    game_on = true;

    const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) { player_cells_light_off.id = "player"; }

    const ai_cells_light_on = document.getElementById("ai");
    if (null != ai_cells_light_on) { ai_cells_light_on.id = "ai_game_on"; }

    const border_zone_cell = document.querySelectorAll(".border_zone");
    for (let i = 0; i < border_zone_cell.length; i++) {
      border_zone_cell[i].className = "free";
    }

  } else { showMessage("Set more ships, please!"); }
}

let border_hit_cell;
let player_ship;

function checkForHit() {
  if (!game_on) {return ;}

  const element_under_mouse = document.querySelectorAll(":hover");
  const cell = element_under_mouse[element_under_mouse.length-1];
  const cell_class = cell.className;

  if("ship_ai" == cell_class.slice(0, 7) ) {
    cell.style.backgroundColor = "Coral";
    cell.className = "hit " + cell_class.slice(8, 14);
    ship_AI_hit++;

    if (0 == document.querySelectorAll("." + cell_class.slice(0, 7) + "." + cell_class.slice(8, 14)).length ) {
      setBorder(cell);
    }

    if (20 == ship_AI_hit) {
      set_game = false;
      game_on = false;

      const ai_cells_light_off = document.getElementById("ai_game_on");
      if (null != ai_cells_light_off) { ai_cells_light_off.id = "ai"; }

      showMessage("Victory! =)");
    }
  } else if ("free" == cell_class){
      cell.className = "miss";
      cell.style.backgroundColor = "LightGray";
    } else {return ;}

  //ai turn
  let available_for_attack;
  let attack_cell_id;
  let attack_cell;
  border_hit_cell = document.querySelectorAll(".available_cell");

  if (0 != border_hit_cell.length) {
    attack_cell_id = Math.floor(Math.random() * border_hit_cell.length);
    attack_cell = border_hit_cell[attack_cell_id];
  } else {
      available_for_attack = document.querySelectorAll(".left td:not(.miss)");
      attack_cell_id = Math.floor(Math.random() * available_for_attack.length);
      attack_cell = available_for_attack[attack_cell_id];
  }

  if ("ship" == attack_cell.className.slice(0, 4)) {
    player_ship = attack_cell.className.slice(5, 8);
    attack_cell.style.backgroundColor = "Coral";
    attack_cell.className = "hit";
    ship_player_hit++;

    availableCellPlayer(attack_cell);

    if (0 == document.querySelectorAll("." + player_ship).length) {
      const border_zone_cell = document.querySelectorAll(".available_cell");
        for (let i = 0; i < border_zone_cell.length; i++) {
        border_zone_cell[i].className = "miss";
      }
    }

    if (20 == ship_player_hit) {
      set_game = false;
      game_on = false;

      const ai_cells_light_off = document.getElementById("ai_game_on");
      if (null != ai_cells_light_off) { ai_cells_light_off.id = "ai"; }

      showMessage("Losing! =(");
    }
  } else { attack_cell.className = "miss"; }
}

//to turn on/off the cell's highlight for player and ai, parameters are boolean
function setHighlight(player, ai) {
  if (player) {
    const player_cells_light_on = document.getElementById("player");
    if (null != player_cells_light_on) {
    player_cells_light_on.id = "player_set";
  console.log("Highlight player: on");
    }
}
else {
  const player_cells_light_off = document.getElementById("player_set");
    if (null != player_cells_light_off) {
    player_cells_light_off.id = "player";
  console.log("Highlight player: off");
  }
}

if (ai) {
  const ai_cells_light_on = document.getElementById("ai");
    if (null != ai_cells_light_on) {
    ai_cells_light_on.id = "ai_game_on";
  console.log("Highlight ai: on");
  }
}
else {
  const ai_cells_light_off = document.getElementById("ai_game_on");
    if (null != ai_cells_light_off) {
    ai_cells_light_off.id = "ai";
  console.log("Highlight ai: off");
  }
}
}

function availableCellAi(cell) {
  let ship_cell = cell;

  let ship_row;
  let ship_column;
  let ship_id;
  let ship_id_next;
  let available_cell;


  ship_row = parseInt(ship_cell.id.slice(2, 3));
  ship_column = parseInt(ship_cell.id.slice(3, 4));
  ship_id = parseInt(ship_cell.id.slice(2, 4));


  if (ship_row > 0) {
    ship_id_next = (ship_id - 10).toString();
    if (ship_id_next < 10) {
      ship_id_next = "ai0" + ship_id_next;
    }
    else {
      ship_id_next = "ai" + ship_id_next;
    }
    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className) {
      available_cell.className = "available_cell_ai";
    }
  }

  if (ship_column < 9) {
    ship_id_next = (ship_id + 1).toString();
    if (ship_id_next < 10) {
      ship_id_next = "ai0" + ship_id_next;
    }
    else {
      ship_id_next = "ai" + ship_id_next;
    }
    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className) {
      available_cell.className = "available_cell_ai";
    }
  }

  if (ship_row < 9) {
    ship_id_next = (ship_id + 10).toString();
    ship_id_next = "ai" + ship_id_next;
    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className) {
      available_cell.className = "available_cell_ai";
    }
  }

  if (ship_column > 0) {
    ship_id_next = (ship_id - 1).toString();
    if (ship_id_next < 10) {
      ship_id_next = "ai0" + ship_id_next;
    }
    else {ship_id_next = "ai" + ship_id_next;}
    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className) {
      available_cell.className = "available_cell_ai";
    }
  }

  let available_cells = document.querySelectorAll(".available_cell_ai");
  return available_cells;
}

function availableCellPlayer(cell) {
  let ship_cell = cell;

  let ship_row;
  let ship_column;
  let ship_id;
  let ship_id_next;
  let available_cell;

  ship_row = parseInt(ship_cell.id.slice(0, 1));
  ship_column = parseInt(ship_cell.id.slice(1, 2));
  ship_id = parseInt(ship_cell.id.slice(0, 2));

  if (ship_row > 0) {
    ship_id_next = (ship_id - 10).toString();
    if (ship_id_next < 10) {
      ship_id_next = "0" + ship_id_next;
    }
    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className || "ship" == available_cell.className.slice(0, 4)) {
      available_cell.className = available_cell.className + " available_cell";
    }
  }

  if (ship_column < 9) {
    ship_id_next = (ship_id + 1).toString();
    if (ship_id_next < 10) {
      ship_id_next = "0" + ship_id_next;
    }
    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className || "ship" == available_cell.className.slice(0, 4)) {
      available_cell.className = available_cell.className + " available_cell";
    }
  }

  if (ship_row < 9) {
    ship_id_next = (ship_id + 10).toString();
    ship_id_next = ship_id_next;
    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className || "ship" == available_cell.className.slice(0, 4)) {
      available_cell.className = available_cell.className + " available_cell";
    }
  }

  if (ship_column > 0) {
    ship_id_next = (ship_id - 1).toString();
    if (ship_id_next < 10) {
      ship_id_next = "0" + ship_id_next;
    }
    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className || "ship" == available_cell.className.slice(0, 4)) {
      available_cell.className = available_cell.className + " available_cell";
    }
  }

  let available_cells = document.querySelectorAll(".available_cell");
  return available_cells;
}

function availableShipCell(cell) {
  let ship_cell = cell;

  let ship_row;
  let ship_column;
  let ship_id;
  let ship_id_next;
  let available_cell;

  ship_row = parseInt(ship_cell.id.slice(0, 1));
  ship_column = parseInt(ship_cell.id.slice(1, 2));
  ship_id = parseInt(ship_cell.id.slice(0, 2));

  if (ship_row > 0) {
    ship_id_next = (ship_id - 10).toString();
    if (ship_id_next < 10) {
      ship_id_next = "0" + ship_id_next;
    }

    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className) {
      available_cell.className = "availbale_ship_cell";
    }
  }

  if (ship_column < 9) {
    ship_id_next = (ship_id + 1).toString();
    if (ship_id_next < 10) {
      ship_id_next = "0" + ship_id_next;
    }

    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className) {
      available_cell.className = "availbale_ship_cell";
    }
  }

  if (ship_row < 9) {
    ship_id_next = (ship_id + 10).toString();

    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className) {
      available_cell.className = "availbale_ship_cell";
    }
  }

  if (ship_column > 0) {
    ship_id_next = (ship_id - 1).toString();
    if (ship_id_next < 10) {
      ship_id_next = "0" + ship_id_next;
    }

    available_cell = document.getElementById(ship_id_next);

    if ("free" == available_cell.className) {
      available_cell.className = "availbale_ship_cell";
    }
  }

  let available_cells = document.querySelectorAll(".availbale_ship_cell");
  return available_cells;
}

function setBorder(cell) {
  const ship_cells = document.querySelectorAll("." + cell.className.slice(0, 3) + "." + cell.className.slice(4, 10));
  for (let i = 0; i < ship_cells.length; i++) {
    availableCellAi(ship_cells[i]);
  }
  const border_cells = document.querySelectorAll(".available_cell_ai");
  for (let i = 0; i < border_cells.length; i++) {
    border_cells[i].className = "border_cell";
    border_cells[i].style.backgroundColor = "Silver";
  }
  return;
}
