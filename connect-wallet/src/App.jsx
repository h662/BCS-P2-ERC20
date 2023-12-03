import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import Web3, { Contract } from "web3";
import MintTokenAbi from "./MintTokenAbi.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();

  const { sdk, provider } = useSDK();

  const onClickMetamask = async () => {
    try {
      const accounts = await sdk?.connect();

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async () => {
    try {
      const response = await contract.methods.balanceOf(account).call();

      console.log(web3);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!provider) return;

    setWeb3(new Web3(provider));
  }, [provider]);

  useEffect(() => {
    if (!web3) return;
    setContract(
      new web3.eth.Contract(
        MintTokenAbi,
        "0xb4A8F0740f9abfd620d69Da915DB37C5a2d56927"
      )
    );
  }, [web3]);

  useEffect(() => {
    if (!account) return;

    getToken();
  }, [account]);

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      {account ? (
        <>
          <div>
            Hello, {account.substring(0, 7)}...
            {account.substring(account.length - 5)}
          </div>
          <div>Token : 1000 BTC</div>
        </>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xl"
          onClick={onClickMetamask}
        >
          Connect Metamask
        </button>
      )}
    </div>
  );
};

export default App;
