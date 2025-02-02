import { Tooltip } from 'antd';
import { ReactComponent as Info } from 'assets/images/info.svg';
import { marketTranslateSelector } from 'config/Configs.selector';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  display: flex;
  margin: 40px auto;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  .achieve-title {
    text-align: center;
  }

  .achieve-sub-title {
    text-align: center;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
  }

  .fade-in-section {
    opacity: 0;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 1200ms ease-out, transform 600ms ease-out, visibility 1200ms ease-out;
    will-change: opacity, transform, visibility;
  }

  .fade-in-section.is-visible {
    opacity: 1;
    transform: none;
    visibility: visible;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    width: 100%;
    .ant-card-body {
      padding: 0px;
    }
  `}
`;

const Item = styled.div`
  .achieve {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .achieve-item-title {
    font-weight: 700;
    font-size: 34px;
    line-height: 120%;
    text-align: center;
    margin-bottom: 0;
    color: ${({ theme }) => theme.text1};
  }
  .achieve-item-sub-title {
    color: ${({ theme }) => theme.text2};
    font-weight: 500;
    line-height: 140%;
    text-align: center;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        .achieve-item-sub-title {
          font-weight: 400;
          line-height: 140%;
          text-align: center;
        }
    `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        .achieve {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
        }
        .achieve-item-sub-title {
            line-height: 27px;
        }
        .achieve-item-title {
        }
    `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
          .ant-card-body {
          }
          .achieve-item-title {
            font-size: 34px;
          }
          .achieve {
            margin-bottom: 24px;
          }
          .achieve-item-sub-title {
          }
    `}
`;

const Analytics = () => {
  const marketTrs = useSelector(marketTranslateSelector);

  const [isCountUp, setIsCountUp] = useState<boolean>(false);
  const Factory = React.useMemo(
    () => [
      {
        number: 250,
        prefix: '$',
        suffix: 'M+',
        desc: 'Volume shielded',
      },
      {
        number: 6,
        prefix: '+',
        suffix: 'M',
        desc: 'Anonymous transactions',
      },
      {
        number: 100,
        prefix: '',
        suffix: '+',
        desc: 'Coins supported',
        // tooltipContent:
        //   'Incognito exchange connects liquidity from different sources such as Uniswap, Curve, PancakeSwap, and SpookySwap to enable privacy trades.',
      },
      {
        number: 16,
        prefix: '',
        suffix: '',
        desc: 'Bridges supported',
      },
    ],
    [marketTrs]
  );

  const renderItem = (item: any) => (
    <Item style={{ flex: 1, minWidth: 200 }}>
      <div className={'achieve'}>
        <VisibilitySensor
          onChange={(isVisible) => {
            if (isVisible) {
              setIsCountUp(true);
            }
          }}
          delayedCall
        >
          <CountUp
            className="achieve-item-title"
            start={0}
            end={isCountUp ? item?.number : 0}
            duration={1}
            decimals={item?.decimals}
            decimal="."
            prefix={item?.prefix}
            suffix={item?.suffix}
            enableScrollSpy={true}
          />
        </VisibilitySensor>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <p className="h8 achieve-item-sub-title">{item.desc}</p>
          {item?.tooltipContent && (
            <Tooltip title={item?.tooltipContent}>
              <Info style={{ marginLeft: 5 }} />
            </Tooltip>
          )}
        </div>
      </div>
    </Item>
  );
  return (
    <Styled className="default-max-width">
      {Factory?.map((item, i) => {
        return renderItem(item);
      })}
    </Styled>
  );
};

export default React.memo(Analytics);
