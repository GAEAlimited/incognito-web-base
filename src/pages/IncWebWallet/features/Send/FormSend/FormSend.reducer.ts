// import { isMainnet } from 'config';
// import { SupportedChainId } from 'constants/chains';
// import { BIG_COINS, MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
// import { Reducer } from 'redux';

// import { FormDepositActions, FormDepositActionType, IFormDepositReducer } from './FormSend.types';

// const initialState: IFormDepositReducer = {
//   isFetching: false,
//   sellToken: {
//     identify: `${BIG_COINS.ETH.tokenID}-${PRIVATE_TOKEN_CURRENCY_TYPE.ETH}`,
//     currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
//     chainID: isMainnet ? SupportedChainId.MAINNET : SupportedChainId.KOVAN,
//     networkName: MAIN_NETWORK_NAME.ETHEREUM,
//   },
//   buyToken: {
//     identify: `${BIG_COINS.ETH_UNIFIED.tokenID}-${PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN}`,
//     currency: PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20,
//     networkName: MAIN_NETWORK_NAME.INCOGNITO,
//     chainID: 0,
//   },
// };

// export const reducer: Reducer<IFormDepositReducer, FormDepositActions & any> = (
//   state = initialState,
//   action: FormDepositActions
// ): IFormDepositReducer => {
//   switch (action.type) {
//     case FormDepositActionType.SET_TOKEN: {
//       const { sellToken, buyToken } = action.payload;
//       return {
//         ...state,
//         sellToken: sellToken ? sellToken : state.sellToken,
//         buyToken: buyToken ? buyToken : state.buyToken,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default reducer;

export {};
