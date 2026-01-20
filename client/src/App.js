import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);

        const { chainId } = await provider.getNetwork();
        if (chainId !== 1337) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x539' }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x539',
                  chainName: 'Hardhat Localhost',
                  rpcUrls: ['http://127.0.0.1:8545'],
                  nativeCurrency: { name: 'TestETH', symbol: 'TestETH', decimals: 18 }
                }],
              });
            }
          }
        }
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x1Eb835EB7BEEEE9E6bbFe08F16a2d2eF668204bd";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      <div className="bg-animation"></div>
      {!modalOpen && (
        <button className="share-btn" onClick={() => setModalOpen(true)}>
          Share Access
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <div className="container">
          <div className="glass-card">
            <h1>D-Box (Secure)</h1>

            <div className="account-info">
              {account ? (
                <>
                  Connected: <span className="account-highlight">{account}</span>
                </>
              ) : (
                <button
                  className="connect-btn"
                  onClick={async () => {
                    const provider = window.ethereum
                      ? new ethers.providers.Web3Provider(window.ethereum)
                      : null;

                    if (provider) {
                      await provider.send("eth_requestAccounts", []);
                      const signer = provider.getSigner();
                      const address = await signer.getAddress();
                      setAccount(address);
                    } else {
                      alert("Metamask is not installed");
                    }
                  }}
                >
                  Connect Wallet
                </button>
              )}
            </div>

            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
            ></FileUpload>
            <Display contract={contract} account={account}></Display>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
