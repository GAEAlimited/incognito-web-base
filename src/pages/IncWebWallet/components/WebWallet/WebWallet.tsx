import { useModal } from 'components/Modal';
import BalanceModal from 'components/Modal/Modal.balance';
import BalanceHandler from 'pages/IncWebWallet/actions/balanceHandler';
import ScanCoinHandler from 'pages/IncWebWallet/actions/scanCoinHandler';
import { WalletState } from 'pages/IncWebWallet/core/types';
import Server from 'pages/IncWebWallet/services/wallet/Server';
import React, { useEffect } from 'react';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { defaultAccountPaymentAddressSelector, defaultAccountSelector } from 'state/account/account.selectors';
import { incognitoWalletSetAccount, incognitoWalletSetState } from 'state/incognitoWallet';
import { masterKeyReducerSelector, webWalletStateSelector } from 'state/masterKey';
import { isFirstTimeScanCoinsSelector } from 'state/scanCoins';
import { shortenString } from 'utils';

import { Image } from '../../../../components/Core/Image';
import { PRIVATE_TOKEN_CURRENCY_TYPE, ROOT_NETWORK_IMG } from '../../../../constants';
import { ScanCoinsProgressBar } from '../ScanCoinsProgressBar/ScanCoinsProgressBar';
import UnlockWalletModal from '../UnlockWalletModal';
// import BoxScanCoinModal from '../BoxScanCoin';
import { Container, Text, WalletButton, Wrapper } from './WebWallet.styled';

const INTERVAL_TIME_LOAD_BALANCE = 10000; //10s
let loadBalanceInterval: any = null;

const WebWallet = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { setModal } = useModal();

  const webWalletState = useSelector(webWalletStateSelector);
  const address = useSelector(defaultAccountPaymentAddressSelector);
  const isScanCoins = useSelector(isFirstTimeScanCoinsSelector);
  const currentAccount = useSelector(defaultAccountSelector);
  const masterKey = useSelector(masterKeyReducerSelector);

  console.log(masterKey);

  useEffect(() => {
    Server.setDefaultIsMainetServer();
  }, []);

  useEffect(() => {
    dispatch(incognitoWalletSetState(webWalletState));
    switch (webWalletState) {
      case WalletState.uninitialized:
        dispatch(incognitoWalletSetAccount([]));
        break;
      case WalletState.locked:
        dispatch(incognitoWalletSetAccount([]));
        break;
      case WalletState.unlocked:
        handleWhenWalletStateUnlocked();
        break;
    }
  }, [webWalletState]);

  useEffect(() => {
    if (!currentAccount || webWalletState !== WalletState.unlocked) {
      if (loadBalanceInterval) clearInterval(loadBalanceInterval);
      loadBalanceInterval = null;
    } else {
      BalanceHandler.getFollowTokensBalance();
      if (!loadBalanceInterval) {
        loadBalanceInterval = setInterval(() => {
          BalanceHandler.getFollowTokensBalance();
        }, INTERVAL_TIME_LOAD_BALANCE);
      }
    }
  }, [currentAccount]);

  const handleWhenWalletStateUnlocked = async () => {
    //Start get accounts
    ScanCoinHandler.startScan();
  };

  const onClickCreateWallet = async () => {
    history.push('/wallet/create');
  };

  const onClickImportWallet = async () => {
    history.push('/wallet/import');
  };

  const onClickUnlockWallet = () => {
    setModal({
      closable: true,
      data: <UnlockWalletModal />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Unlock wallet',
      isSearchTokenModal: true,
    });
  };

  const onClickWallet = () => {
    setModal({
      closable: true,
      data: <BalanceModal />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Account',
      isSearchTokenModal: true,
    });
  };

  return (
    <div className="wrap-inc-waller">
      <Container>
        {webWalletState === WalletState.uninitialized && (
          <>
            <WalletButton isImport={false} onClick={onClickCreateWallet}>
              <p className="text">Create wallet</p>
            </WalletButton>
            <WalletButton isImport style={{ marginLeft: 16 }} onClick={onClickImportWallet}>
              <p className="text">Import wallet</p>
            </WalletButton>
          </>
        )}
        {webWalletState === WalletState.locked && (
          <WalletButton isImport={false} onClick={onClickUnlockWallet}>
            <p className="text">Unlock wallet</p>
          </WalletButton>
        )}
        {webWalletState === WalletState.unlocked && (
          <>
            <Wrapper isConnected onClick={onClickWallet}>
              <Image iconUrl={ROOT_NETWORK_IMG[PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO]} />
              <Text>{address ? shortenString(address) : ''}</Text>
            </Wrapper>
            {isScanCoins && <ScanCoinsProgressBar />}
          </>
        )}
      </Container>
    </div>
  );
};

export default memo(WebWallet);
