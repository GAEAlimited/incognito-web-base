import { getINCContractAddress } from 'constants/infura';
// eslint-disable-next-line no-restricted-imports
import { ContractTransaction } from 'ethers';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useTokenContract } from 'hooks/useContract';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';
const initValue = { isCheckingApprove: false, isApproved: true, approvedAllowance: '0', isApproving: false };

export interface IApprove {
  isCheckingApprove: boolean;
  isApproved: boolean;
  isApproving: boolean;
  approvedAllowance: string;
  checkIsApproved: ({ sendAmount }: { sendAmount: number }) => void;
  handleApproveToken: () => void;
}

const useApproveToken = ({ token }: { token: SelectedPrivacy }): IApprove => {
  const [state, setState] = React.useState<{
    isCheckingApprove: boolean;
    isApproved: boolean;
    isApproving: boolean;
    approvedAllowance: string;
  }>(initValue);

  const { account, chainId } = useActiveWeb3React();
  const contract = useTokenContract(token.contractID ? token.contractID : null, true);

  const checkIsApproved = async ({ sendAmount = 0 }: { sendAmount?: number } = {}) => {
    try {
      if (!account || !chainId) return;
      setState((value) => ({ ...value, isCheckingApprove: true }));
      const INC_CONTRACT = getINCContractAddress({ chainId });
      const approvedAllowance = await contract?.allowance(account, INC_CONTRACT);
      setState((value) => ({
        ...value,
        isApproved: !!approvedAllowance && approvedAllowance.gt(sendAmount),
        approvedAllowance: approvedAllowance ? approvedAllowance.toString() : '0',
        isCheckingApprove: false,
      }));
    } catch (e) {
      setState(initValue);
    }
  };

  // const handleGetNonce = async (): Promise<number> => {
  //   let nonce = 0;
  //   try {
  //     if (!account || !chainId) return nonce;
  //     const web3 = getWeb3({ chainId });
  //     nonce = await web3.eth.getTransactionCount(account);
  //   } catch (error) {
  //     console.log('GET NONCE FAIL: ', error);
  //   }
  //   return nonce;
  // };

  const handleApproveToken = async (): Promise<ContractTransaction | undefined> => {
    let tx: ContractTransaction | undefined;
    try {
      if (!account || !chainId || token.isMainEVMToken) return;
      setState((value) => ({ ...value, isApproving: true }));
      const approveMax = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
      const INC_CONTRACT = getINCContractAddress({ chainId });
      tx = await contract?.approve(INC_CONTRACT, approveMax).then();
    } catch (error) {
      console.log('HANDLE APPROVE FAIL: ', error);
    } finally {
      setState((value) => ({ ...value, isApproving: false }));
    }
    return tx;
  };

  React.useEffect((): any => {
    if (!account || !chainId) return;
    if (token.isMainEVMToken) {
      return setState((value) => ({
        ...value,
        isApproved: true,
      }));
    }
    checkIsApproved().then();
  }, [account, chainId, token.tokenID]);

  return {
    isCheckingApprove: state.isCheckingApprove,
    isApproved: state.isApproved,
    isApproving: state.isApproving,
    approvedAllowance: state.approvedAllowance,

    checkIsApproved,
    handleApproveToken,
  };
};

export default useApproveToken;
