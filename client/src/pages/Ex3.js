import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Ex3 from '../contracts/Ex3.json';

export default function Ex3Component() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [concatA, setConcatA] = useState('');
  const [concatB, setConcatB] = useState('');
  const [concatResult, setConcatResult] = useState('');
  const [concatAvec, setConcatAvec] = useState('');
  const [concatAvecResult, setConcatAvecResult] = useState('');
  const [length, setLength] = useState(null);
  const [compareA, setCompareA] = useState('');
  const [compareB, setCompareB] = useState('');
  const [compareResult, setCompareResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const provider = new Web3.providers.HttpProvider('http://localhost:7545');
        const web3Instance = new Web3(provider);
        const accs = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = Ex3.networks[networkId];
        if (!deployedNetwork) {
          setError('Contract not deployed on this network');
          return;
        }
        const instance = new web3Instance.eth.Contract(Ex3.abi, deployedNetwork.address);
        setWeb3(web3Instance);
        setAccounts(accs);
        setContract(instance);

        const currentMessage = await instance.methods.getMessage().call();
        setMessage(currentMessage);
        const lengthMsg = await instance.methods.longueur().call();
        setLength(lengthMsg);
      } catch (err) {
        setError('Failed to connect to local blockchain');
        console.error(err);
      }
    };
    init();
  }, []);

  const updateMessage = async () => {
    if (!contract || !accounts.length) return;
    try {
      await contract.methods.setMessage(newMessage).send({ from: accounts[0] });
      const updatedMessage = await contract.methods.getMessage().call();
      setMessage(updatedMessage);
      const lengthMsg = await contract.methods.longueur().call();
      setLength(lengthMsg);
      setNewMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  const doConcat = async () => {
    if (!contract) return;
    try {
      const result = await contract.methods.concatener(concatA, concatB).call();
      setConcatResult(result);
    } catch (err) {
      console.error(err);
    }
  };

  const doConcatAvec = async () => {
    if (!contract) return;
    try {
      const result = await contract.methods.concatenerAvec(concatAvec).call();
      setConcatAvecResult(result);
    } catch (err) {
      console.error(err);
    }
  };

  const doCompare = async () => {
    if (!contract) return;
    try {
      const result = await contract.methods.comparer(compareA, compareB).call();
      setCompareResult(result);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <div>{error}</div>;
  if (!web3) return <div>Loading Web3, accounts, and contract...</div>;

  return (
    <div>
      <div>
        <h3>Current Message:</h3>
        <p>{message}</p>
        <p>Length: {length}</p>
        <input
          type="text"
          placeholder="New message"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button onClick={updateMessage}>Set Message</button>
      </div>

      <div>
        <h3>Concatenate two strings:</h3>
        <input
          type="text"
          placeholder="String A"
          value={concatA}
          onChange={e => setConcatA(e.target.value)}
        />
        <input
          type="text"
          placeholder="String B"
          value={concatB}
          onChange={e => setConcatB(e.target.value)}
        />
        <button onClick={doConcat}>Concat</button>
        <p>Result: {concatResult}</p>
      </div>

      <div>
        <h3>Concatenate with current message:</h3>
        <input
          type="text"
          placeholder="New string to append"
          value={concatAvec}
          onChange={e => setConcatAvec(e.target.value)}
        />
        <button onClick={doConcatAvec}>Concat avec</button>
        <p>Result: {concatAvecResult}</p>
      </div>

      <div>
        <h3>Compare two strings:</h3>
        <input
          type="text"
          placeholder="String A"
          value={compareA}
          onChange={e => setCompareA(e.target.value)}
        />
        <input
          type="text"
          placeholder="String B"
          value={compareB}
          onChange={e => setCompareB(e.target.value)}
        />
        <button onClick={doCompare}>Compare</button>
        <p>Are equal: {compareResult === null ? '' : compareResult.toString()}</p>
      </div>

      <div>Accounts: {accounts.join(', ')}</div>
    </div>
  );
}
