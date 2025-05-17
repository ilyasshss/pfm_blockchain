import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Ex2 from '../contracts/Ex2.json';

export default function Ex2Component() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [etherInput, setEtherInput] = useState('');
  const [weiInput, setWeiInput] = useState('');
  const [weiResult, setWeiResult] = useState('');
  const [etherResult, setEtherResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3Instance = new Web3(provider);
        const accs = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = Ex2.networks[networkId];
        if (!deployedNetwork) {
          setError('Contract not deployed on this network');
          return;
        }
        const instance = new web3Instance.eth.Contract(Ex2.abi, deployedNetwork.address);
        setWeb3(web3Instance);
        setAccounts(accs);
        setContract(instance);
      } catch (err) {
        console.error(err);
        setError('Failed to connect to local blockchain');
      }
    };

    init();
  }, []);

  const convertEtherToWei = async () => {
    if (!contract) return;
    try {
      const wei = await contract.methods.etherEnWei(etherInput).call();
      setWeiResult(wei);
    } catch (err) {
      console.error(err);
      setWeiResult('Error');
    }
  };

  const convertWeiToEther = async () => {
    if (!contract) return;
    try {
      const ether = await contract.methods.weiEnEther(weiInput).call();
      setEtherResult(ether);
    } catch (err) {
      console.error(err);
      setEtherResult('Error');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Ether"
          value={etherInput}
          onChange={e => setEtherInput(e.target.value)}
        />
        <button onClick={convertEtherToWei}>Convert Ether to Wei</button>
        <div>Wei: {weiResult}</div>
      </div>
      <div>
        <input
          type="number"
          placeholder="Wei"
          value={weiInput}
          onChange={e => setWeiInput(e.target.value)}
        />
        <button onClick={convertWeiToEther}>Convert Wei to Ether</button>
        <div>Ether: {etherResult}</div>
      </div>
      <div>Accounts: {accounts.join(', ')}</div>
    </div>
  );
}
