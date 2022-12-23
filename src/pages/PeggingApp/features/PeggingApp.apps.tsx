import { Col, Row } from 'antd';
import avveImg from 'assets/images/avve-logo.png';
import cakeImg from 'assets/images/cake-icon.png';
import curveImg from 'assets/images/curve-icon.png';
import joeImg from 'assets/images/joe-icon.png';
import linkImg from 'assets/images/link-icon.png';
import raydiumImg from 'assets/images/raydium-logo.png';
import solendImg from 'assets/images/solend-logo.png';
import spookyImg from 'assets/images/spooky-icon.png';
import trisolarisImg from 'assets/images/trisolaris-icon.png';
import uniImg from 'assets/images/uni-icon.png';
import unknowImg from 'assets/images/unknow-icon.png';
import { LinkIcon } from 'components/icons';
import { MAIN_NETWORK_NAME } from 'constants/token';
import { actionSetSwapNetwork } from 'pages/Swap/features/FormUnshield/FormUnshield.actions';
import { SwapExchange } from 'pages/Swap/features/FormUnshield/FormUnshield.types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'state/hooks';
// import { isMobile } from 'react-device-detect';
import styled, { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  margin-top: 60px;
  //flex-direction: row;
  //justify-content: space-between;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 30px;
  .line-view {
    width: 24px;
  }
  .line {
    width: 0;
    height: 16px;
  }
  .app-margin-right {
    margin-right: 20px;
  }
  .app-margin-left {
    margin-left: 20px;
  }
  .app-margin-top {
    margin-top: 40px;
  }
  .vector-link-icon {
    position: absolute;
    top: 24px;
    right: 24px;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        grid-template-columns: auto auto;
        flex-direction: column;
        margin-top: 0px;
        .app-margin-top {
            margin-top: 0px;
        }
        .app-margin-right {
          margin-right: 0px;
        }
        .app-margin-left {
          margin-left: 0px;
        }
        .app-margin-top-small {
            margin-top: 8px;
        }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
        grid-template-columns: auto;
        flex-direction: column;
        margin-top: 0px;
        .app-margin-top {
            margin-top: 0px;
        }
        .app-margin-right {
          margin-right: 0px;
        }
        .app-margin-left {
          margin-left: 0px;
        }
        .app-margin-top-small {
            margin-top: 8px;
        }
        .vector-link-icon {
          top: 16px;
          right: 16px;
        }
  `}
`;
const StyledItem = styled(Col)<{ isMobile: boolean; canClick: boolean }>`
  display: flex;
  :hover {
    opacity: ${({ canClick, isMobile }) => (canClick && !isMobile ? 0.8 : 1)};
    cursor: ${({ canClick, isMobile }) => (canClick && !isMobile ? 'pointer' : 'unset')};
  }

  .wrap-item-content {
    padding: 30px 30px 20px;
    border-radius: 16px;
    flex: 1;
  }

  .full-height {
    height: 100%;
  }

  .item-img {
    margin-right: 24px;
    width: 88px;
    height: 88px;
  }

  .large-text {
    font-weight: 600;
    font-size: 34px;
    line-height: 48px;
  }

  .normal-text {
    height: fit-content;
  }

  .wrap-name {
    display: inline-flex;
    align-items: baseline;
  }

  .wrap-chain {
    margin-right: 8px;
    min-height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 16px;
    padding-left: 16px;
    border-radius: 8px;
    background: ${({ theme }) => theme.background3};
    p {
      color: white;
    }
  }

  .wrap-main-content {
    //flex-direction: column;
  }

  .desc-text {
    margin-top: 32px;
  }

  .medium-text {
    font-size: 22px;
  }

  .name-desc-text {
    //margin-left: 16px;
  }

  .link-text {
    color: ${({ theme }) => theme.blue1};
    cursor: pointer;
  }

  .wrap-status {
    padding: 1px 6px;
    width: fit-content;
    color: ${({ theme }) => theme.text1};
    border-radius: 4px;
    margin-bottom: 8px;
    background-color: ${({ theme }) => theme.bg4};
  }

  .status-text {
    height: fit-content;
    font-size: 14px;
  }
  .wrap-apps-head {
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        width: 100%;
        margin-top: 4px;
        .wrap-item-content {
           padding: 16px 16px 24px;
           flex: 1;
        }
        .wrap-name {
            flex-direction: column;
        }
        .item-img {
            margin-right: 16px;
            width: 70px;
            height: 70px;
        }
       .desc-text {
         margin-top: 24px;
       }
        .wrap-chain {
            min-height: 24px;
        }
        .chain-text {
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
        }
  `};

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium<{ isMobile: boolean }>`
      .wrap-name {
        display: inline-flex;
        align-items: baseline;
      }
      .name-desc-text {
        margin-left: 0px;
      }
      .wrap-chain {
        margin-right: 8px;
        border-radius: 4px;
        padding-top: 3px;
        padding-bottom: 3px;
      }
      .chain-text {
        line-height: 18px;
      }
      .wrap-status {
        margin-bottom: ${({ isMobile }) => (isMobile ? 0 : 8)}px;
        margin-left: ${({ isMobile }) => (isMobile ? 8 : 0)}px;
      }
      .status-text {
      }
  `};
`;

const Item = React.memo(({ className, data }: { className?: string; data: any }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const ChainList = React.useMemo(
    () => (
      <Row style={{ minWidth: 250 }}>
        {data.chain.map((item: any) => (
          <div style={{ marginTop: 12 }} key={item} className="wrap-chain background3">
            <p className="h8">{item}</p>
          </div>
        ))}
      </Row>
    ),
    []
  );
  const Status = React.useMemo(
    () =>
      data.status ? (
        <div className="wrap-status" style={{ backgroundColor: data.status === 'SHIPPED' ? '#27AE60' : '#404040' }}>
          <p className="status-text color-white">{data.status}</p>
          {/* <p className="status-text fw-medium normal-text">{data.status}</p> */}
        </div>
      ) : null,
    []
  );
  let isMobile = false;
  const canClick = !!data.exchange;
  return (
    <StyledItem
      key={data.name}
      isMobile={isMobile}
      canClick={canClick}
      onClick={() => {
        if (!canClick) return;
        dispatch(actionSetSwapNetwork(MAIN_NETWORK_NAME.INCOGNITO));
        history.push(`papps/${data.exchange}`);
      }}
    >
      <Col className={`wrap-item-content background2`}>
        <Row align="middle" className="wrap-apps-head">
          <img src={data.img} className="item-img" alt="icon" />
          {canClick && <LinkIcon className="vector-link-icon" />}
          <Col className="wrap-main-content">
            {!isMobile && Status}
            <div className="wrap-name">
              <Row align="middle">
                <h5 className="normal-text">{data.name}</h5>
                {isMobile && Status}
              </Row>
            </div>
            <p className="text2 normal-text name-desc-text h8">{data.nameDesc}</p>
            {/*{!isMobile && ChainList}*/}
          </Col>
          {/*{isMobile && ChainList}*/}
          {ChainList}
        </Row>
        <p className="normal-text desc-text description h8 color-white" style={{ color: 'white' }}>
          {data.desc}{' '}
          {!!data.link && (
            <span
              className="link-text"
              onClick={() => {
                window.open(data.linkPath, '_blank');
              }}
            >
              {` ${data.link}`}
              <img src={linkImg} style={{ width: isMobile ? 14 : 18, height: 'auto', marginLeft: 5 }} alt="link-icon" />
            </span>
          )}
        </p>
      </Col>
    </StyledItem>
  );
});

const PeggingListApps = () => {
  return (
    <Styled>
      <Item
        data={{
          img: cakeImg,
          name: 'pPancake',
          nameDesc: 'Private Pancake',
          status: 'SHIPPED',
          chain: ['BNB Chain', 'DEX'],
          desc: "Trade anonymously on BNB Chain's leading DEX. Deep liquidity and super low fees – now with privacy.",
          exchange: SwapExchange.PANCAKE_SWAP,
        }}
        className="app-margin-right"
      />
      <Item
        data={{
          img: uniImg,
          name: 'pUniswap',
          nameDesc: 'Private Uniswap',
          status: 'SHIPPED',
          chain: ['Polygon', 'Ethereum', 'DEX'],
          desc: 'Trade confidentially on everyone’s favorite DEX. Faster and cheaper thanks to Polygon, and private like all Incognito apps.',
          exchange: SwapExchange.UNISWAP,
        }}
        className="app-margin-top-small app-margin-left full-height"
      />
      <Item
        data={{
          img: curveImg,
          name: 'pCurve',
          nameDesc: 'Private Curve',
          status: 'SHIPPED',
          chain: ['Polygon', 'DEX'],
          desc: 'Swap stablecoins with complete confidentiality using Privacy Curve. Low fees on Polygon meets full privacy on Incognito.',
          exchange: SwapExchange.CURVE,
        }}
        className="app-margin-top app-margin-top-small app-margin-right"
      />
      <Item
        data={{
          img: spookyImg,
          name: 'pSpooky',
          status: 'SHIPPED',
          nameDesc: 'Private SpookySwap',
          chain: ['Fantom', 'DEX'],
          desc: 'Explore DeFi on Fantom with full privacy for your activity and assets. Swap Fantom coins anonymously with Private SpookySwap.',
          exchange: SwapExchange.SPOOKY,
        }}
        className="app-margin-top app-margin-top-small app-margin-left"
      />
      <Item
        data={{
          img: joeImg,
          name: 'pTraderJoe',
          status: 'SHIPPED',
          nameDesc: 'Private Trader Joe',
          chain: ['Avalanche', 'DEX'],
          desc: 'Trade confidentially on Trader Joe. Faster privacy swap is enabled by fast transaction finality on Avalanche.',
          exchange: SwapExchange.JOE,
        }}
        className="app-margin-top app-margin-top-small app-margin-right"
      />
      <Item
        data={{
          img: trisolarisImg,
          name: 'pTrisolaris',
          status: 'COMING SOON',
          nameDesc: 'Private Trisolaris',
          chain: ['Aurora', 'DEX'],
          desc: 'Privacy Swap comes to Aurora ecosystem for the first time. Multiple AMMs for best-in-class execution, now with privacy.',
        }}
        className="app-margin-top app-margin-top-small app-margin-left"
      />
      <Item
        data={{
          img: raydiumImg,
          name: 'pRaydium',
          status: 'COMING SOON',
          nameDesc: 'Private Raydium',
          chain: ['Solana', 'DEX', 'Farming'],
          desc: 'Explore DeFi on Solana with full privacy for your activity and assets. Swap, provide liquidity, farm, and stake.',
        }}
        className="app-margin-top app-margin-top-small app-margin-right"
      />
      <Item
        data={{
          img: avveImg,
          name: 'pAave',
          status: 'COMING SOON',
          nameDesc: 'Private Aave',
          chain: ['Polygon', 'Lending'],
          desc: 'Earn interest on deposits and borrow assets on everyone’s favorite lending protocol – confidentially.',
        }}
        className="app-margin-top app-margin-top-small app-margin-left"
      />
      <Item
        data={{
          img: solendImg,
          name: 'pSolend',
          status: 'COMING SOON',
          nameDesc: 'Private Solend',
          chain: ['Solana', 'Lending'],
          desc: 'Get privacy for what you lend, borrow, and earn on Solana. Protect your activity from prying eyes.',
        }}
        className="app-margin-top app-margin-top-small app-margin-right"
      />
      <Item
        data={{
          img: unknowImg,
          name: 'pAnything',
          nameDesc: 'Private Anything',
          chain: ['Blockchain', 'Use case'],
          desc: 'The Incognito community is building out the 2022 roadmap. Which app do you want privacy for?',
          link: 'Join the conversation',
          linkPath: 'https://we.incognito.org/t/incognito-2022-technical-roadmap/15002',
        }}
        className="app-margin-top app-margin-top-small app-margin-left"
      />
    </Styled>
  );
};

export default React.memo(PeggingListApps);
