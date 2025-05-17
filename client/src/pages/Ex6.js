import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Ex6Contract from '../contracts/Ex6.json';

const Ex6 = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [newNumber, setNewNumber] = useState('');
  const [arrayElements, setArrayElements] = useState([]);
  const [sum, setSum] = useState(null);
  const [index, setIndex] = useState('');
  const [elementAtIndex, setElementAtIndex] = useState(null);

  useEffect(() => {
    const init = async () => {
      const provider = new Web3.providers.HttpProvider('http://localhost:7545');
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = Ex6Contract.networks[networkId];
      if (!deployedNetwork) {
        alert('Contract not deployed on the detected network.');
        return;
      }

      const contractInstance = new web3Instance.eth.Contract(
        Ex6Contract.abi,
        deployedNetwork.address
      );
      setContract(contractInstance);
      fetchArray(contractInstance);
      fetchSum(contractInstance);
    };

    init();
  }, []);

  const fetchArray = async (contractInstance) => {
    const arr = await contractInstance.methods.afficheTableau().call();
    setArrayElements(arr);
  };

  const fetchSum = async (contractInstance) => {
    const s = await contractInstance.methods.calculerSomme().call();
    setSum(s);
  };

  const addNumber = async () => {
    if (!contract || newNumber === '') return;
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.ajouterNombre(parseInt(newNumber)).send({ from: accounts[0] });
      setNewNumber('');
      fetchArray(contract);
      fetchSum(contract);
    } catch {
      alert('Error adding number');
    }
  };

  const getElementAtIndex = async () => {
    if (!contract || index === '') return;
    try {
      const elem = await contract.methods.getElement(parseInt(index)).call();
      setElementAtIndex(elem);
    } catch {
      alert('Invalid index');
      setElementAtIndex(null);
    }
  };

  return (
    <div>
      <h2>Exercise 6 - Array Management</h2>
      <input
        type="number"
        placeholder="Number to add"
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
      <button onClick={addNumber}>Add Number</button>

      <div>
        <h3>Array Elements:</h3>
        <ul>
          {arrayElements.map((num, i) => (
            <li key={i}>{num}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Sum of Elements: {sum !== null ? sum : 'Loading...'}</h3>
      </div>

      <div>
        <input
          type="number"
          placeholder="Index to get"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button onClick={getElementAtIndex}>Get Element</button>
        {elementAtIndex !== null && <p>Element at index {index}: {elementAtIndex}</p>}
      </div>
    </div>
  );
};

export default Ex6;
