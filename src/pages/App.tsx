import ErrorBoundary from 'components/Core/ErrorBoundary';
import Header from 'components/Core/Header';
import IncognitoWalletProvider from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import Loader from 'components/Core/Loader';
import Popups from 'components/Core/Popups';
import InternetDisconnected from 'pages/InternetDisconnected/InternetDisconnected';
import MobileNotSuported from 'pages/MobileNotSuported/MobileNotSuported';
import PageNotFound from 'pages/PageNotFound/PageNotFound';
import Swap, { RedirectPathToSwapOnly, RedirectToSwap } from 'pages/Swap';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { DarkModeQueryParamReader } from 'theme';
import { isMobile } from 'utils/userAgent';

import enhance from './App.enhance';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 4rem 8px 16px 8px;
  `};
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`;

const Marginer = styled.div`
  margin-top: 5rem;
`;

const App = () => {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <ErrorBoundary>
      <Route component={DarkModeQueryParamReader} />
      <IncognitoWalletProvider>
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Suspense fallback={<Loader />}>
              <Switch>
                {isMobile ? (
                  <Route component={MobileNotSuported} />
                ) : (
                  <>
                    <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                    <Route exact strict path="/swap" component={Swap} />
                    {isMobile ? <Route component={MobileNotSuported} /> : <Route component={RedirectPathToSwapOnly} />}
                    <Route exact strict path="/page-not-found" component={PageNotFound} />
                    <Route exact strict path="/internet-disconnected" component={InternetDisconnected} />
                  </>
                )}
              </Switch>
            </Suspense>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      </IncognitoWalletProvider>
    </ErrorBoundary>
  );
};

export default enhance(App);
