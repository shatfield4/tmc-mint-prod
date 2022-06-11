import {useModal} from "../utils/ModalContext"
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v1/Header";
import Banner from "../components/section/banner/v3";
import MintNowModal from "../common/modal/mintNowModal" 
import WalletModal from "../common/modal/walletModal/WalletModal" 
const HomeWL = () => {
  const { visibility, walletModalvisibility } = useModal();
  return (
    <>
      <Layout>
      <GlobalStyles />
      {visibility && <MintNowModal />}
      {walletModalvisibility && <WalletModal />}
        <Header />
        <Banner />
      </Layout>
    </>
  );
};

export default HomeWL;
