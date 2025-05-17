const Ex8 = artifacts.require("Ex8");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Ex8, accounts[0]);
};
