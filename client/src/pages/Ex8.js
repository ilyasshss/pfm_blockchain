import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Ex8Contract from '../contracts/Ex8.json';

const Ex8 = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('0');
  const [account, setAccount] = useState('');

  useEffect(() => {
    const init = async () => {
      const provider = new Web3.providers.HttpProvider('http://localhost:7545');
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = Ex8Contract.networks[networkId];
      if (!deployedNetwork) {
        alert('Contract not deployed on the detected network.');
        return;
      }

      const contractInstance = new web3Instance.eth.Contract(
        Ex8Contract.abi,
        deployedNetwork.address
      );
      setContract(contractInstance);

      const rec = await contractInstance.methods.recipient().call();
      setRecipient(rec);

      const bal = await web3Instance.eth.getBalance(deployedNetwork.address);
      setBalance(web3Instance.utils.fromWei(bal, 'ether'));
    };

    init();
  }, []);

  const sendEther = async () => {
    if (!contract || !amount) return;
    try {
      await web3.eth.sendTransaction({
        from: account,
        to: contract.options.address,
        value: web3.utils.toWei(amount, 'ether'),
      });
      const bal = await web3.eth.getBalance(contract.options.address);
      setBalance(web3.utils.fromWei(bal, 'ether'));
      setAmount('');
    } catch {
      alert('Failed to send Ether');
    }
  };

  const withdraw = async () => {
    if (!contract) return;
    try {
      await contract.methods.withdraw().send({ from: account });
      const bal = await web3.eth.getBalance(contract.options.address);
      setBalance(web3.utils.fromWei(bal, 'ether'));
    } catch {
      alert('Withdraw failed: only recipient can withdraw');
    }
  };

  return (
    <div>
      <h2>Exercise 8 - Ether Wallet</h2>
      <p>Recipient: {recipient}</p>
      <p>Contract Balance: {balance} ETH</p>
      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendEther}>Send Ether</button>
      <button onClick={withdraw}>Withdraw</button>
      <p>Your account: {account}</p>
    </div>
  );
};

export default Ex8;
