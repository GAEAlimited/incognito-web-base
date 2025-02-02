// import { Row } from 'antd';
import { Row } from 'antd';
import Swap from 'pages/Swap';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import MarketAchieve from './features/Market.achieve';
import MarketBanner from './features/Market.banner';
import MarketCategory from './features/Market.category';
import MarketQuestions from './features/Market.questions';
import MarketTokens from './features/Market.token';
import MarketInfo from './features/MarketInfo';
import MarketTitleBox from './features/MarketTitleBox';
import { Styled } from './Market.styled';

const Home = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  const listenToScroll = () => {
    // let heightToHideFrom = 100;
    // const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    //
    // if (winScroll > heightToHideFrom) {
    //   isVisible && setIsVisible(false);
    // } else {
    //   setIsVisible(true);
    // }
  };

  return (
    <Styled isMobile={isMobile}>
      <div>
        {!isMobile && <MarketTitleBox />}
        <Row
          className="default-padding-horizontal market-header"
          style={{ display: 'flex', flexDirection: 'row' }}
          align="middle"
          justify="center"
        >
          {isMobile && <MarketBanner />}
          {!isMobile ? <Swap /> : <MarketTokens />}
        </Row>
        {/*{!isMobile && isVisible && (*/}
        {/*  <Lottie*/}
        {/*    isClickToPauseDisabled={true}*/}
        {/*    options={{*/}
        {/*      loop: true,*/}
        {/*      autoplay: true,*/}
        {/*      animationData,*/}
        {/*    }}*/}
        {/*    height={60}*/}
        {/*    style={{ marginTop: 40 }}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
      <div className={`fade-in-section ${!isVisible ? 'is-visible' : ''}`}>
        {!isMobile && <MarketInfo />}
        <div className="default-max-width">{isMobile ? <MarketCategory /> : <MarketQuestions />}</div>
      </div>
      {isMobile && <MarketAchieve />}
    </Styled>
  );
};

export default memo(Home);
