
function addTable(table_id) {
  const body = document.getElementsByTagName('body')[0];
  const element = document.createElement('table');
  element.id = table_id;
  body.appendChild(element);
  return element;
}

describe("Create a field to play", function() {

  it("returns false if there is already one", function() {
    let table_id = "field_exists";
    let table = addTable(table_id);
    const table_cell = document.createElement('th');
    table.appendChild(table_cell);
    expect(createField(table_id)).toBe(false);
  });

  it("returns false if there is no place for a field", function(){
    let table_id = "place_exists";
    expect(createField(table_id)).toBe(false);
  });

  it("returns true if a playfield was succesfully added", function(){
    let table_id = "playfield";
    let table = addTable(table_id);
    const table_cell = document.createElement('th');
    table.appendChild(table_cell);
    expect(createField(table_id)).toBe(true);
  });

});

describe("Check if a HTML-element is a proper playfield", function(){

  let table_id = "proper_field";
  let element = document.getElementById(table_id);
  it("returns true", function(){
    expect(isProperField(element)).toBe(true);
  });

})

describe("Check if there is a field to play", function(){

  describe("if there is no one", function(){
    let table_id = "field_not_exist_test";
    addTable(table_id);
    it("returns false", function() {
      expect(isFieldExists(table_id)).toBe(false);
    });
  })

  describe("if there is a one", function() {
    let table_id = "field_exist_test";
    let table = addTable(table_id);
    const table_cell = document.createElement('th');
    table.appendChild(table_cell);
    
    it("returns true", function() {
      expect(isFieldExists(table_id)).toBe(true);
    });
  })
  
});

describe("Check if there is a place for a field", function(){
   
  describe("if there is no one", function(){
    let table_id = "place_not_exist_test";
    it("returns false", function(){
      expect(isFieldPlaceExists(table_id)).toBe(false);
    });
  })

  describe("if there is one", function(){
    let table_id = "place_exist_test";
    addTable(table_id);

    it("returns true", function(){
      expect(isFieldPlaceExists(table_id)).toBe(true);
    });
  })

});