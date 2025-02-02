import PTokenModel from 'models/model/pTokenModel';
import { TokenActionType } from 'state/webToken/webToken.types';
// import { followsTokenAssetsSelector } from '@module/Assets';
// import { networkSelector } from '@popup/configs';
// const { PRVIDSTR } = require('incognito-chain-web-js/build/web/wallet');

export const getBalanceStart = (tokenSymbol: any) => ({
  type: TokenActionType.GET_BALANCE,
  data: tokenSymbol,
});

export const getBalanceFinish = (tokenSymbol: any) => ({
  type: TokenActionType.GET_BALANCE_FINISH,
  data: tokenSymbol,
});

export const setListPToken = (tokens: PTokenModel[]) => {
  if (!tokens) {
    throw new TypeError('Tokens must be an array');
  }
  return {
    type: TokenActionType.SET_PTOKEN_LIST,
    payload: tokens,
  };
};

// export const getPTokenList =
//   ({ expiredTime = EXPIRED_TIME } = {}) =>
//   async (dispatch: AppThunkDispatch, getState: AppGetState) => {
//     try {
//       const state = getState();
//       const network = networkSelector(state);
//       const accountSender = defaultAccountWalletSelector(state);
//       const followTokens = await accountSender.getListFollowingTokens();

//       const [pTokens, tokensInfo] = await Promise.all([
//         await getTokenList({ expiredTime, network }),
//         await getTokensInfo({ tokenIDs: followTokens }),
//       ]);

//       const tokens = uniqBy([...pTokens, ...tokensInfo], 'tokenId');
//       dispatch(setListPToken(tokens));
//       return tokens;
//     } catch (e) {
//       throw e;
//     }
//   };

// const actionAddFollowToken =
//   ({ tokenID }: { tokenID: string }) =>
//   async (dispatch: AppThunkDispatch, getState: AppGetState) => {
//     try {
//       const state = getState();
//       const accountSender = defaultAccountWalletSelector(state);
//       if (!accountSender) return;
//       const followed: IBalance[] = followsTokenAssetsSelector(state);
//       const newFollowed = followed.concat([
//         {
//           id: tokenID,
//           amount: '0',
//           swipable: tokenID !== PRVIDSTR,
//         },
//       ]);
//       await accountSender.addListFollowingToken({
//         tokenIDs: newFollowed.map(({ id }) => id),
//       });
//     } catch (error) {
//       throw error;
//     }
//   };

// export { actionAddFollowToken };
