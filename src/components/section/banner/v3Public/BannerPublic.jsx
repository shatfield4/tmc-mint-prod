import { useState } from "react";
import { ethers } from 'ethers';
import { useEffect } from "react";
import abi from '../../../../contracts/TMC.json'
import Web3Modal from 'web3modal';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnect from "@walletconnect/web3-provider";
import truncateEthAddress from 'truncate-eth-address';
import { toHex } from '../../../../utils/utils';
import cyclingGif from "../../../../assets/images/banner/cyclingGif.gif"

import Button from "../../../../common/button";

import BannerStyleWrapper from "./Banner.style";


const BannerPublic = () => {
  const [count, setCount] = useState(1);
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState();
  const [tmcContract, setTmcContract] = useState();
  const [truncAccount, setTruncAccount] = useState();
  const [totalMinted, setTotalMinted] = useState('-');
  const [chainId, setChainId] = useState(0x1);
  const [publicPrice, setPublicPrice] = useState(2.5);
  const [totalSupply, setTotalSupply] = useState(410);


  const tmcContractAddress = "0xfFd1684a921C5519bE794e1F2AEb42B6e48794f8";
  const deployedChainId = 4; // 0x1 ETH Mainnet, 0x4 Rinkeby testnet


  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) setAccount(accounts[0]);
        disconnect();
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
        disconnect();
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  // Provider options for Web3Modal
  const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "TMC Mint",
        infuraId: "b3476aa6328d4b468b6256e95a7b3b33", // https://mainnet.infura.io/v3/b3476aa6328d4b468b6256e95a7b3b33
        chainId: 1,
        darkMode: true
      }
    },
    walletconnect: {
      package: WalletConnect, 
      options: {
          infuraId: "b3476aa6328d4b468b6256e95a7b3b33"
      }
    }
  }
  // Instantiate the Web3Modal
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions
  });

  // If user has connected to site before, automatically connect their wallet
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  // Connect user to correct chain
  const switchNetwork = async () => {
    try {
      library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(deployedChainId)}]
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Connects wallet when user presses connect wallet button
  const connectWallet = async () => {
    try{
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const signer = library.getSigner();

      await switchNetwork();

      const tmcContract = new ethers.Contract(tmcContractAddress, abi, signer);

      const accounts = await library.listAccounts();

      if(accounts) {
        setAccount(accounts[0]);
        setTruncAccount(truncateEthAddress(accounts[0]));
      }

      setProvider(provider);
      setLibrary(library);
      setTmcContract(tmcContract);

      // Update total minted to display on site
      setTotalMinted(ethers.utils.formatUnits(await tmcContract.totalSupply(), 0));
      // Update current mint price
      setPublicPrice(ethers.utils.formatEther(await tmcContract.diamondPublicPrice()));
      

      setConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Mint clicked handler function for minting for public sale
  const mintDiamondPublic = async () => {
    try {
      let mintTx = await tmcContract.mintDiamond(count, { value: ethers.utils.parseEther((count * publicPrice).toString())});
      await mintTx.wait();

      alert(`Your mint transaction was successful: https://etherscan.io/tx/${mintTx.hash}`)
      setTotalMinted(ethers.utils.formatUnits(await tmcContract.totalSupply(), 0));
    } catch (err) {
      if(err.toString().includes('insufficient')){
        alert("You do not have enough ETH in your wallet to mint.");
      }

      if(err.toString().includes('denied trans')){
        alert("You declined the mint transaction.")
      }
    }
  }
  
  // Lets user disconnect wallet from site
  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    setConnected(false);
    setProvider("");
    setLibrary("");
    setTruncAccount("");
    localStorage.clear();
  };


  return (
    <BannerStyleWrapper className="bithu_v3_baner_sect" id="home">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="banner-image-area3">
              {/* particles component */}
              <img
                className="banner-image banner-image1"
                src={cyclingGif}
                alt="bithu banner thumb"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-conent3">
              <h4 className="banner-subtitle text-uppercase">
                Public Sale : <span className="red-color">Live</span>
              </h4>
              <h1 className="banner-title text-uppercase">Mint is live now</h1>
              <div className="banner-count-inner d-flex align-items-center">
                <div className="banner-btn-area">
                  <span
                    className="input-number-decrement"
                    onClick={() => (count > 1 ? setCount(count - 1) : count)}
                  >
                    ???
                  </span>
                  <input
                    className="input-number"
                    type="text"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  />
                  <span
                    className="input-number-increment"
                    onClick={() => count < 100 ? setCount(count + 1) : count}
                  >
                    +
                  </span>
                </div>
                <div className="bithu_v3_baner_buttons">
                  <Button lg variant="mint" hidden={connected === true} onClick={() => connectWallet()}>
                    Connect Wallet
                  </Button>
                  <Button lg variant="mint" hidden={ connected === false } onClick={() => mintDiamondPublic()}>
                    Mint Now
                  </Button>
                </div>
              </div>
              <div className="bithu_v3_timer">
                <br></br><br></br>
                <h5 className="text-uppercase">Total Cost: { count * publicPrice } Eth + gas</h5>
              </div>  
              <div className="banner-bottom-text text-uppercase">
                Minted: { totalMinted }/{ totalSupply }
              </div>
              <div className="banner-bottom-text text-uppercase"> {/*Diamond WL price 1.2 eth for 1, 1 eth for multiple, Diamond public 2.5 eth*/}
                Diamond tier public <br></br>{ (publicPrice).toString() } ETH each + gas
              </div>
              <div className="banner-bottom-text text-uppercase" hidden={connected === false}>
                <Button lg variant="mint" onClick={() => disconnect()}>
                Connected to: { truncAccount }
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerStyleWrapper>
  );
};

export default BannerPublic;
