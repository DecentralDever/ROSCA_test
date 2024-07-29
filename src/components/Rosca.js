import React, { useState, useEffect } from 'react';
import { loadWeb3, loadContract } from '../utils/loadContract';

const Rosca = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [contributionAmount, setContributionAmount] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await loadWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const roscaContract = await loadContract(web3, networkId);
      
      setAccount(accounts[0]);
      setContract(roscaContract);

      const contribution = await roscaContract.methods.contributionAmount().call();
      setContributionAmount(web3.utils.fromWei(contribution, 'ether'));

      const members = await roscaContract.methods.getMembers().call();
      setMembers(members);
    };
    init();
  }, []);

  const joinRosca = async () => {
    await contract.methods.joinROSCA().send({ from: account, value: Web3.utils.toWei(contributionAmount, 'ether') });
  };

  const contribute = async () => {
    await contract.methods.contribute().send({ from: account, value: Web3.utils.toWei(contributionAmount, 'ether') });
  };

  const withdraw = async () => {
    await contract.methods.withdraw().send({ from: account });
  };

  return (
    <div>
      <h1>ROSCA Platform</h1>
      <p>Account: {account}</p>
      <p>Contribution Amount: {contributionAmount} ETH</p>
      <button onClick={joinRosca}>Join ROSCA</button>
      <button onClick={contribute}>Contribute</button>
      <button onClick={withdraw}>Withdraw</button>

      <h2>Members</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
};

export default Rosca;
