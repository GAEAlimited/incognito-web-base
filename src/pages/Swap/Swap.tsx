import { Col } from 'antd';
import Loader from 'components/Core/Loader';
import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { changeTab } from 'components/Core/Tabs/Tabs.reducer';
import { selectedTabSelector } from 'components/Core/Tabs/Tabs.selectors';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { isFetchingSelectors as isFetchingTokenSelector } from 'state/token';
import styled, { DefaultTheme } from 'styled-components/macro';

import { FormDeposit } from './features/FormDeposit';
import { FormUnshield } from './features/FormUnshield';
import enhance from './Swap.enhance';

export const Styled = styled(Col)`
  border: 1px solid ${({ theme }) => theme.border1};
  border-radius: 18px;
  background: ${({ theme }) => theme.bg3};
  width: 575px;
  padding: 24px;
  box-shadow: rgb(116, 116, 116, 0.4) 0px 5px, rgb(116, 116, 116, 0.3) 0px 10px, rgb(116, 116, 116, 0.2) 0px 15px,
    rgb(116, 116, 116, 0.1) 0px 20px, rgb(116, 116, 116, 0.05) 0px 25px;
  min-height: 400px;
  .loader {
    left: 48%;
  }
  overflow: hidden;
  .wrap-token {
    box-sizing: border-box;
    min-height: 520px;
  }
  .token-main-title {
    background-color: ${({ theme }) => theme.background2};
    height: 72px;
  }
  .token-wrap-item {
    height: 88px;
    align-items: center;
    justify-content: space-between;
    padding-left: 32px;
    padding-right: 32px;
    border-bottom: 1px solid ${({ theme }) => theme.border1};
    // border-right: 1px solid ${({ theme }) => theme.background2};
  }
  .token-wrap-item:last-child {
    border-bottom-width: 0;
  }
  .token-name {
    margin-left: 0;
  }
  .token-wrap-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .token-wrap-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
    height: 56px;
    justify-content: space-between;
  }
  .image-token {
    width: 56px;
    height: 56px;
    border-radius: 28px;
    margin-right: 24px;
  }
  .wrap-first-item {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .medium-text {
    font-size: 22px;
    line-height: 33px;
    letter-spacing: 0.01em;
  }
  .regular-text {
    font-size: 16px;
    line-height: 24px;
  }
  .tab-header-title-left {
    font-weight: 600;
    font-size: 26px;
    line-height: 39px;
    letter-spacing: 0.01em;
  }
  .header-text {
    font-size: 16px;
    line-height: 24px;
  }
  .token-padding {
    padding-left: 32px;
    padding-right: 32px;
  }
  .gradient-view {
    background: linear-gradient(180deg, rgba(26, 26, 26, 0.2) 0%, #1a1a1a 100%);
    height: 88px;
    position: absolute;
    bottom: 0;
    right: 15px;
    width: 100%;
    visibility: hidden;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    .wrap-token {
        min-height: 480px;
    }
    .token-wrap-item {
        height: 80px;
    }
    .token-main-title {
      height: 64px;
    }
    .image-token {
        width: 48px;
        height: 48px;
        border-radius: 28px;
        margin-right: 10px;
    }
    .tab-header-title-left {
      font-size: 20px;
      line-height: 30px;
    }
    .tab-header-title-right {
      font-size: 16px;
      line-height: 24px;
    }
    .header-text {
        font-size: 16px;
        line-height: 24px;
    }
    .medium-text {
        font-size: 18px;
        line-height: 27px;
    }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        border-width: 0px;
        .wrap-token {
        }
        .token-wrap-item {
            padding-left: 16px;
            padding-right: 16px;
        }
        .token-wrap-header {
            padding-left: 16px;
            padding-right: 16px;
        }
        .image-token {
            width: 32px;
            height: 32px;
            border-radius: 28px;
            margin-right: 10px;
        }
        .token-main-title {
            height: 59px;
        }
        .medium-text {
            font-size: 14px;
            line-height: 21px;
        }
        .token-padding {
            padding-left: 16px;
            padding-right: 16px;
        }
        .tab-header-title-right {
            padding-top: 4px;
            font-size: 14px;
        }
        .tab-header-title-left {
            font-size: 18px;
        }
        .header-text {
          font-size: 14px;
          line-height: 24px;
        }
          .token-wrap-item:last-child {
            border-bottom-width: 1px;
          }
    `}
`;

const Swap = (props: any) => {
  const { SWAP: HEADER_TAB } = TAB_LIST;
  const selectedTab = useAppSelector(selectedTabSelector)(HEADER_TAB.rootTab);
  const isFetching = useAppSelector(isFetchingTokenSelector);

  const dispatch = useAppDispatch();
  const location: any = useLocation();

  const renderForm = () => {
    // Deposit
    if (selectedTab === HEADER_TAB.tabNames[1]) return <FormDeposit {...props} />;
    return <FormUnshield {...props} />;
  };

  const renderContent = () => (
    <>
      <Tabs {...HEADER_TAB} />
      {renderForm()}
    </>
  );

  React.useEffect(() => {
    if (location?.state?.tokenId1 && location?.state?.tokenId2) {
      dispatch(changeTab({ tab: TAB_LIST.SWAP.tabNames[0], rootTab: TAB_LIST.SWAP.rootTab }));
    }
  }, [location?.state?.tokenId1, location?.state?.tokenId2]);

  return (
    <>
      <Styled className="token-extra">{isFetching ? <Loader /> : renderContent()}</Styled>
    </>
  );
};

export default enhance(Swap);
