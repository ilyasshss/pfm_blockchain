const Ex7 = artifacts.require("Ex7");

contract("Ex7", (accounts) => {
  let ex7;

  beforeEach(async () => {
    // Deploy a new Ex7 contract before each test
    ex7 = await Ex7.new(0, 0, 5, 10);
  });

  it("should deploy the Ex7 contract", async () => {
    // Check the coordinates after deployment (should be (0,0))
    const coordinates = await ex7.afficheXY();
    assert.equal(coordinates[0].toString(), "0", "x coordinate is incorrect");
    assert.equal(coordinates[1].toString(), "0", "y coordinate is incorrect");
  });

  it("should move the shape by dx and dy", async () => {
    // Move the shape by (3, 4)
    await ex7.deplacerForme(3, 4);

    const coordinates = await ex7.afficheXY();
    assert.equal(coordinates[0].toString(), "3", "x coordinate after move is incorrect");
    assert.equal(coordinates[1].toString(), "4", "y coordinate after move is incorrect");
  });

  it("should return the correct information about the shape", async () => {
    // Check the shape information (should return "Je suis Rectangle")
    const info = await ex7.afficheInfos();
    assert.equal(info, "Je suis Rectangle", "Incorrect shape info");
  });

  it("should calculate the correct surface area", async () => {
    // Surface area should be 5 * 10 = 50
    const area = await ex7.surface();
    assert.equal(area.toString(), "50", "Surface area calculation is incorrect");
  });

  it("should return the correct length and width", async () => {
    const dimensions = await ex7.afficheLoLa();
    assert.equal(dimensions[0].toString(), "5", "Length is incorrect");
    assert.equal(dimensions[1].toString(), "10", "Width is incorrect");
  });
});
