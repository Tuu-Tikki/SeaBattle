
function addTable(table_id) {
  const body = document.getElementsByTagName('body')[0];
  const element = document.createElement('table');
  element.id = table_id;
  body.appendChild(element);
  return element;
}


describe("Create a field to play", function() {

  let table_id = "test";

  it("return false if there is already one", function() {
    expect(createField(table_id)).toBe(false);
  });

  it("return false if there is no place for a field", function(){
    expect(createField(table_id)).toBe(false);
  });

});

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