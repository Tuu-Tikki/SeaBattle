
describe("Draw a gamefield", function() {

  const field = new Gamefield(10, "player");
  it("returns true if there is a place for the gamefield", function(){
    expect(field.isPlaceForItExist()).toBe(true);
  });
  it("returns true if a gamefield was succesfully drawn", function(){
    expect(field.isDrawn()).toBe(true);
  });
});
