import "./App.css";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ex1 from "./pages/Ex1";
import Ex2 from "./pages/Ex2";
import Ex3 from "./pages/Ex3";
import Ex4 from "./pages/Ex4";
import Ex5 from "./pages/Ex5";
import Ex6 from "./pages/Ex6";
import Ex7 from "./pages/Ex7";
import Ex8 from "./pages/Ex8";

function App() {
  const [blockchainInfo, setBlockchainInfo] = useState(null);
  const [latestTx, setLatestTx] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3("http://127.0.0.1:7545");

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const latestBlock = await web3.eth.getBlock("latest", true);
      const lastTx = latestBlock.transactions.length > 0 ? latestBlock.transactions[0] : null;

      setBlockchainInfo({
        url: "http://127.0.0.1:7545",
        networkId,
        account: accounts[0],
        block: latestBlock,
      });

      setLatestTx(lastTx);
    };

    loadBlockchainData();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Projet de Fin de Module</h1>
          <h2>Développement d’une dApp pour le TP 3</h2>
          <h3>Solidity, Truffle et ReactJS</h3>
        </header>

        <nav className="nav-links">
          <ul>
            <li><Link to="/ex1">Exercice 1: Addition</Link></li>
            <li><Link to="/ex2">Exercice 2: Soustraction</Link></li>
            <li><Link to="/ex3">Exercice 3: Chaînes de caractères</Link></li>
            <li><Link to="/ex4">Exercice 4: Tableaux</Link></li>
            <li><Link to="/ex5">Exercice 5: Structures</Link></li>
            <li><Link to="/ex6">Exercice 6: Mappings</Link></li>
            <li><Link to="/ex7">Exercice 7: Enumérations</Link></li>
            <li><Link to="/ex8">Exercice 8: Les unités de temps, ether et gas</Link></li>
          </ul>
        </nav>

        <div className="route-container">
          <Routes>
            <Route path="/ex1" element={<Ex1 />} />
            <Route path="/ex2" element={<Ex2 />} />
            <Route path="/ex3" element={<Ex3 />} />
            <Route path="/ex4" element={<Ex4 />} />
            <Route path="/ex5" element={<Ex5 />} />
            <Route path="/ex6" element={<Ex6 />} />
            <Route path="/ex7" element={<Ex7 />} />
            <Route path="/ex8" element={<Ex8 />} />
          </Routes>
        </div>

        {/* Blockchain Info Footer */}
        <footer className="blockchain-footer">
          <h2>Informations de la Blockchain</h2>
          {!blockchainInfo ? (
            <p>Chargement des données...</p>
          ) : (
            <div className="footer-content">
              <div className="block-info">
                <h3>Blockchain</h3>
                <p><strong>URL :</strong> {blockchainInfo.url}</p>
                <p><strong>ID :</strong> {blockchainInfo.networkId}</p>
                <p><strong>Compte :</strong> {blockchainInfo.account}</p>
                <p><strong>N° :</strong> {blockchainInfo.block.number}</p>
                <p><strong>Hash :</strong> {blockchainInfo.block.hash}</p>
                <p><strong>Timestamp :</strong> {new Date(Number(blockchainInfo.block.timestamp) * 1000).toLocaleString()}</p>
                <p><strong>parentHash :</strong> {blockchainInfo.block.parentHash}</p>
                <p><strong>Transactions :</strong> {blockchainInfo.block.transactions.length}</p>
                <p><strong>Miner :</strong> {blockchainInfo.block.miner}</p>
                <p><strong>Gas Limit :</strong> {blockchainInfo.block.gasLimit}</p>
                <p><strong>Gas Used :</strong> {blockchainInfo.block.gasUsed}</p>
                <p><strong>Size :</strong> {blockchainInfo.block.size}</p>
              </div>

              <div className="tx-info">
                <h3>Transactions (1)</h3>
                {latestTx ? (
                  <>
                    <p><strong>Expéditeur :</strong> {latestTx.from}</p>
                    <p><strong>Destinataire :</strong> {latestTx.to}</p>
                    <p><strong>Montant :</strong> {Web3.utils.fromWei(latestTx.value, "ether")} ETH</p>
                    <p><strong>Gas :</strong> {latestTx.gas}</p>
                    <p><strong>Hash :</strong> {latestTx.hash}</p>
                    <p><strong>Bloc :</strong> {latestTx.blockNumber}</p>
                    <p className="fonction-appelee"><strong>Fonction appelée (input) :</strong> <br/> {latestTx.input}</p>
                  </>
                ) : (
                  <p>Aucune transaction dans le dernier bloc</p>
                )}
              </div>
            </div>
          )}
        </footer>
      </div>
    </Router>
  );
}

export default App;
