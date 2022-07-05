import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { AppState } from 'state';
import { groupNetworkSelectors } from 'state/token';

import { IFormDepositReducer } from './FormDeposit.types';

export interface IDepositData {
  sellTokenList: PToken[];
  sellNetworkList: ITokenNetwork[];
  sellToken: SelectedPrivacy;
  sellTokenParent: SelectedPrivacy;
  sellNetworkName: string;
}

const getDepositData = ({
  deposit,
  getDataByTokenID,
  getDepositTokenData,
  state,
}: {
  deposit: IFormDepositReducer;
  getDataByTokenID: (tokenID: string) => SelectedPrivacy;
  getDepositTokenData: (tokenID: string) => SelectedPrivacy;
  state: AppState;
}): IDepositData => {
  const { sellToken, buyToken } = deposit;
  const { networkName: sellNetworkName, tokenID: sellTokenID } = sellToken;
  const groupNetwork = groupNetworkSelectors(state);

  // Sell tokens
  const _sellTokenList = groupNetwork[sellNetworkName];
  const _sellToken = getDepositTokenData(sellToken.tokenID);
  const _sellTokenParent = getDataByTokenID(_sellToken.parentTokenID);
  const _sellNetworkList = _sellTokenParent.supportedNetwork;

  return {
    sellTokenList: _sellTokenList,
    sellNetworkList: _sellNetworkList || [],
    sellToken: _sellToken,
    sellTokenParent: _sellTokenParent,
    sellNetworkName,
  };
};

export { getDepositData };