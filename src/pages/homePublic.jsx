import {useModal} from "../utils/ModalContext"
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v1/Header";
import BannerPublic from "../components/section/banner/v3Public";
import CharacterSlider from "../components/section/characterSlider/v3";
import MintNowModal from "../common/modal/mintNowModal" 
import WalletModal from "../common/modal/walletModal/WalletModal" 
const HomePublic = () => {
  const { visibility, walletModalvisibility } = useModal();
  return (
    <>
      <Layout>
      <GlobalStyles />
      {visibility && <MintNowModal />}
      {walletModalvisibility && <WalletModal />}
        <Header />
        <BannerPublic />
        <CharacterSlider />
      </Layout>
    </>
  );
};

export default HomePublic;
