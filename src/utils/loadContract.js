import Web3 from 'web3';
import ROSCA from '../../build/contracts/ROSCA.json';

const loadContract = async (web3, networkId) => {
  const deployedNetwork = ROSCA.networks[networkId];
  const contract = new web3.eth.Contract(
    ROSCA.abi,
    deployedNetwork && deployedNetwork.address
  );
  return contract;
};

const loadWeb3 = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    return web3;
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    return null;
  }
};

export { loadContract, loadWeb3 };
