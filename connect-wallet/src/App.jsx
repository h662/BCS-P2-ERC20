import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import Web3 from "web3";

const App = () => {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState();

  const { sdk, provider } = useSDK();

  const onClickMetamask = async () => {
    try {
      const accounts = await sdk?.connect();

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!provider) return;

    setWeb3(new Web3(provider));
  }, [provider]);

  useEffect(() => console.log(web3), [web3]);

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
