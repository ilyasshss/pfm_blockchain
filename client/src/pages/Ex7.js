import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Ex7Contract from '../contracts/Ex7.json';

const Ex7 = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [length, setLength] = useState(null);
  const [width, setWidth] = useState(null);
  const [info, setInfo] = useState('');
  const [surface, setSurface] = useState(null);
  const [dx, setDx] = useState('');
  const [dy, setDy] = useState('');

  useEffect(() => {
    const init = async () => {
      const provider = new Web3.providers.HttpProvider('http://localhost:7545');
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = Ex7Contract.networks[networkId];
      if (!deployedNetwork) {
        alert('Contract not deployed on the detected network.');
        return;
      }

      const contractInstance = new web3Instance.eth.Contract(
        Ex7Contract.abi,
        deployedNetwork.address
      );
      setContract(contractInstance);

      const coords = await contractInstance.methods.afficheXY().call();
      setPosition({ x: Number(coords[0]), y: Number(coords[1]) });

      const loLa = await contractInstance.methods.afficheLoLa().call();
      setLength(Number(loLa[0]));
      setWidth(Number(loLa[1]));

      const infos = await contractInstance.methods.afficheInfos().call();
      setInfo(infos);

      const surf = await contractInstance.methods.surface().call();
      setSurface(surf);
    };

    init();
  }, []);

  const moveShape = async () => {
    if (!contract || dx === '' || dy === '') return;
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.deplacerForme(parseInt(dx), parseInt(dy)).send({ from: accounts[0] });
      const coords = await contract.methods.afficheXY().call();
      setPosition({ x: Number(coords[0]), y: Number(coords[1]) });
      setDx('');
      setDy('');
    } catch {
      alert('Failed to move shape');
    }
  };

  return (
    <div>
      <h2>Exercise 7 - Rectangle</h2>
      <p>Position: x = {position.x}, y = {position.y}</p>
      <p>Length: {length}</p>
      <p>Width: {width}</p>
      <p>Info: {info}</p>
      <p>Surface: {surface}</p>

      <input
        type="number"
        placeholder="dx"
        value={dx}
        onChange={(e) => setDx(e.target.value)}
      />
      <input
        type="number"
        placeholder="dy"
        value={dy}
        onChange={(e) => setDy(e.target.value)}
      />
      <button onClick={moveShape}>Move Shape</button>
    </div>
  );
};

export default Ex7;
