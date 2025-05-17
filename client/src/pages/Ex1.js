import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Ex1Contract from "../contracts/Ex1.json";

export default function Ex1() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [sum1, setSum1] = useState(null);
  const [sum2, setSum2] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const accountsList = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = Ex1Contract.networks[networkId];

        if (!deployedNetwork) {
          alert("Contract not deployed to this network ID: " + networkId);
          return;
        }

        const instance = new web3Instance.eth.Contract(
          Ex1Contract.abi,
          deployedNetwork.address
        );

        console.log("✅ Contract ABI loaded:", Ex1Contract.abi);
        console.log("✅ Deployed Address:", deployedNetwork.address);
        console.log("ℹ️ Current provider:", web3Instance.currentProvider);

        setWeb3(web3Instance);
        setAccounts(accountsList);
        setContract(instance);
      } catch (error) {
        console.error("🚫 Initialization failed:", error);
      }
    };

    init();
  }, []);

  const handleAddition1 = async () => {
    if (!contract || accounts.length === 0) return;
    try {
      console.log("🔄 Calling addition1 with from address...");
      const result = await contract.methods.addition1().call({ from: accounts[0] });
      console.log("✅ addition1 result:", result);
      setSum1(result);
    } catch (err) {
      console.error("🚫 Error calling addition1:", err);
    }
  };

  const handleAddition2 = async (e) => {
    e.preventDefault();
    if (!contract || accounts.length === 0) return;

    const aVal = Number(a);
    const bVal = Number(b);

    console.log("📥 Input A:", aVal, "Input B:", bVal);

    try {
      const result = await contract.methods.addition2(aVal, bVal).call({ from: accounts[0] });
      console.log("✅ addition2 result:", result);
      setSum2(result);
    } catch (err) {
      console.error("🚫 Error calling addition2:", err);
    }
  };

  return (
    <div>
      <h2>Exercice 1: Addition</h2>

      <div>
        <h3>addition1 (via constructor values)</h3>
        <button onClick={handleAddition1}>Afficher num1 + num2</button>
        {sum1 !== null && (
          <div style={resultBoxStyle}>
            <p>Résultat: {sum1}</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>addition2 (entrée utilisateur)</h3>
        <form onSubmit={handleAddition2}>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Nombre A"
            required
          />
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Nombre B"
            required
          />
          <button type="submit">Additionner</button>
        </form>
        {sum2 !== null && (
          <div style={resultBoxStyle}>
            <p>Résultat: {sum2}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Styling for result boxes
const resultBoxStyle = {
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#f4f4f4",
  border: "1px solid #ddd",
  borderRadius: "5px",
  width: "fit-content",
};
