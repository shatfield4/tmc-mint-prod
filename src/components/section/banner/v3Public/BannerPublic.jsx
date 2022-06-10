import { useState } from "react";
import { useModal } from "../../../../utils/ModalContext";
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnect from "@walletconnect/web3-provider";


import Button from "../../../../common/button";
import Particle from "../../../../common/particle/v2";

import bannerThumb1 from "../../../../assets/images/banner/Item1.png";
import bannerThumb2 from "../../../../assets/images/banner/Item2.png";
import bannerThumb3 from "../../../../assets/images/banner/Item3.png";
import BannerStyleWrapper from "./Banner.style";
import lib from "react-component-countdown-timer";
const BannerPublic = () => {
  const { mintModalHandle } = useModal();
  const [count, setCount] = useState(1);
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState();

  const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "TMC Mint", // Required
        infuraId: "b3476aa6328d4b468b6256e95a7b3b33", // Required 'https://mainnet.infura.io/v3/b3476aa6328d4b468b6256e95a7b3b33'
        // rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: 1, // Optional. It defaults to 1 if not provided
        darkMode: true // Optional. Use dark theme, defaults to false
      }
    },
    walletconnect: {
      package: WalletConnect, 
      options: {
          infuraId: "b3476aa6328d4b468b6256e95a7b3b33"
      }
    }
  }
  const web3Modal = new Web3Modal({
    providerOptions
  });

  const connectWallet = async () => {
    try{
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const signer = library.getSigner();
      const accounts = await library.listAccounts();

      if(accounts) {
        setAccount(accounts[0]);
      }

      setProvider(provider);
      setLibrary(library);
      setSigner(signer);

      console.log(signer);
      setConnected(true);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <BannerStyleWrapper className="bithu_v3_baner_sect" id="home">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="banner-image-area3">
              {/* particles component */}
              <Particle />
              <img
                className="banner-image banner-image1"
                src={bannerThumb1}
                alt="bithu banner thumb"
              />
              <img
                className="banner-image banner-image2"
                src={bannerThumb2}
                alt="bithu banner thumb"
              />
              <img
                className="banner-image banner-image3"
                src={bannerThumb3}
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
                    –
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
                  <Button lg variant="mint" hidden={connected === false} onClick={() => connectWallet()}>
                    Mint Now
                  </Button>
                </div>
              </div>
              <div className="bithu_v3_timer">
                <br></br><br></br>
                <h5 className="text-uppercase">Total Cost: { count * 2.5 } Eth </h5>
              </div>  
              <div className="banner-bottom-text text-uppercase"> {/*Diamond WL price 1.2 eth for 1, 1 eth for multiple, Diamond public 2.5 eth*/}
                Diamond public 2.5 ETH
              </div>
              <div className="banner-bottom-text text-uppercase" hidden={connected === false}>
                Connected to: { account }
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerStyleWrapper>
  );
};

export default BannerPublic;
