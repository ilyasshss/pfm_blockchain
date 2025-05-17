const Ex8 = artifacts.require("Ex8");

contract("Ex8", accounts => {
  const [deployer, recipient, nonRecipient] = accounts;
  let ex8;

  beforeEach(async () => {
    // Deploy the contract with the recipient set to `recipient` address
    ex8 = await Ex8.new(recipient);
  });

  it("should receive a payment and allow the recipient to withdraw", async () => {
    // Send payment to the contract using Web3, ensuring the correct ABI is used
    await web3.eth.sendTransaction({
      from: deployer,
      to: ex8.address,
      value: web3.utils.toWei("1", "ether")
    });

    // Check the balance of the contract before withdrawal (should be 1 ether)
    const contractBalanceBefore = await web3.eth.getBalance(ex8.address);
    assert.equal(contractBalanceBefore, web3.utils.toWei("1", "ether"), "Contract balance should be 1 ether");

    // Allow the recipient to withdraw the funds
    const recipientBalanceBefore = await web3.eth.getBalance(recipient);
    await ex8.withdraw({ from: recipient });

    // Check the balance of the contract after withdrawal (should be 0)
    const contractBalanceAfter = await web3.eth.getBalance(ex8.address);
    assert.equal(contractBalanceAfter, "0", "Contract balance should be 0 after withdrawal");

    // Check if the recipient's balance has increased by 1 ether
    const recipientBalanceAfter = await web3.eth.getBalance(recipient);
    assert.isTrue(
      web3.utils.toBN(recipientBalanceAfter).gt(web3.utils.toBN(recipientBalanceBefore)),
      "Recipient's balance should have increased"
    );
  });

  it("should not allow non-recipient to withdraw", async () => {
    // Send payment to the contract
    await web3.eth.sendTransaction({
      from: deployer,
      to: ex8.address,
      value: web3.utils.toWei("1", "ether")
    });

    // Try to withdraw from a non-recipient address (should fail)
    try {
      await ex8.withdraw({ from: nonRecipient });
      assert.fail("Non-recipient was able to withdraw");
    } catch (err) {
      assert.include(err.message, "Only the recipient can withdraw the funds", "Error message should be 'Only the recipient can withdraw the funds'");
    }
  });
});
