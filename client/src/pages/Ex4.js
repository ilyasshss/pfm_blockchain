import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Ex4Contract from '../contracts/Ex4.json';

const Ex4 = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const init = async () => {
      const provider = new Web3.providers.HttpProvider('http://localhost:7545');
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = Ex4Contract.networks[networkId];
      if (!deployedNetwork) {
        alert('Contract not deployed to detected network.');
        return;
      }

      const contractInstance = new web3Instance.eth.Contract(
        Ex4Contract.abi,
        deployedNetwork.address
      );
      setContract(contractInstance);
    };

    init();
  }, []);

  const checkPositive = async () => {
    if (!contract) return;
    try {
      const res = await contract.methods.estPositif(parseInt(inputNumber)).call();
      setResult(res);
    } catch (error) {
      alert('Error calling contract method');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Exercise 4 - Check if Number is Positive</h2>
      <input
        type="number"
        value={inputNumber}
        onChange={(e) => setInputNumber(e.target.value)}
        placeholder="Enter an integer"
      />
      <button onClick={checkPositive}>Check</button>
      {result !== null && (
        <p>Result: {result ? 'Positive' : 'Not Positive'}</p>
      )}
    </div>
  );
};

export default Ex4;
