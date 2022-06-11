import { useState } from "react";
import { useModal } from "../../../../utils/ModalContext";

import CountdownTimer from "react-component-countdown-timer";

import Button from "../../../../common/button";
import Particle from "../../../../common/particle/v2";

import bannerThumb1 from "../../../../assets/images/banner/Item1.png";
import bannerThumb2 from "../../../../assets/images/banner/Item2.png";
import bannerThumb3 from "../../../../assets/images/banner/Item3.png";
import cyclingGif from "../../../../assets/images/banner/cyclingGif.gif"
import BannerStyleWrapper from "./Banner.style";
const Banner = () => {
  const { mintModalHandle } = useModal();
  const [count, setCount] = useState(1);
  

  const settings = {
    count: 5432560,
    showTitle: true, 
    labelSize: 14,
    backgroundColor: "transparent",
    color: "",
    dayTitle: "",
    hourTitle: "",
    minuteTitle: "",
    secondTitle: "", 
    id: "countdownwrap",
  };

  return (
    <BannerStyleWrapper className="bithu_v3_baner_sect" id="home">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="banner-image-area3">
              {/* particles component */}
              {/* <Particle /> */}
              <img
                className="banner-image banner-image1"
                src={cyclingGif}
                alt="bithu banner thumb"
              />
              {/* <img
                className="banner-image banner-image2"
                src={bannerThumb2}
                alt="bithu banner thumb"
              />
              <img
                className="banner-image banner-image3"
                src={bannerThumb3}
                alt="bithu banner thumb" */}
              {/* /> */}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-conent3">
              <h4 className="banner-subtitle text-uppercase">
                Whitelist : <span className="red-color">Live</span>
              </h4>
              <h1 className="banner-title text-uppercase">Mint is live now</h1>
              <div className="bithu_v3_timer">
                <h5 className="text-uppercase">Whitelist Mint ends in</h5>
                <div className="timer timer_1">
                  <CountdownTimer {...settings} />
                </div>
              </div>
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
                    onClick={() => count < 3 ? setCount(count + 1) : count}
                  >
                    +
                  </span>
                </div>
                <div className="bithu_v3_baner_buttons">
                  <Button lg variant="mint" onClick={() => mintModalHandle()}>
                    Mint Now
                  </Button>
                </div>
              </div>
              <div className="bithu_v3_timer">
                <br></br><br></br>
                <h5 className="text-uppercase">Total Cost: { count < 2 ? count * 1.2 : count * 1.0 } Eth </h5>
              </div>  
              <div className="banner-bottom-text text-uppercase"> {/*Diamond WL price 1.2 eth for 1, 1 eth for multiple, Diamond public 2.5 eth*/}
                Diamond WL 1.2 Eth for 1 1.0 Eth Multiple
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerStyleWrapper>
  );
};

export default Banner;
