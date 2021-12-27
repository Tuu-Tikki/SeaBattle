
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

  let table_id = "test";
  const body = document.getElementsByTagName('body')[0];
  const element = document.createElement('table');
  element.id = table_id;
  body.appendChild(element);

  describe("if there is no one", function(){

    it("returns false", function() {
      expect(isField(table_id)).toBe(false);
    });
  })

  describe("if there is a one", function() {

    const table_cell = document.createElement('th');
    element.appendChild(table_cell);
    
    it("returns true", function() {
      expect(isField(table_id)).toBe(true);
    })
  })
  
});