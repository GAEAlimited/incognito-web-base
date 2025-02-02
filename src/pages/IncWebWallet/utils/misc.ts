import common from '../constants/common';

export const detectToken = {
  ispETH: (tokenId: any) => tokenId === common.TOKEN_ID.pETH,
  ispBTC: (tokenId: any) => tokenId === common.TOKEN_ID.pBTC,
  ispBNB: (tokenId: any) => tokenId === common.TOKEN_ID.pBNB,
  ispNEO: (tokenId?: string) => tokenId && tokenId === common.TOKEN_ID.pNEO,
};

export const generateTestId = (id: any) => {
  return { accessibilityLabel: id, testID: id };
};
