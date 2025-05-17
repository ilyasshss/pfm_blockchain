const Ex7 = artifacts.require("Ex7");

module.exports = function(deployer) {
  deployer.deploy(Ex7, 0, 0, 5, 10);
};
