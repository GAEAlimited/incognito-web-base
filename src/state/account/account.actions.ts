/* eslint-disable no-restricted-syntax */
import AccountModel from 'pages/IncWebWallet/models/account';
import MasterKeyModel from 'pages/IncWebWallet/models/MasterKeyModel';
import { ExHandler } from 'pages/IncWebWallet/services/exception';
import accountService from 'pages/IncWebWallet/services/wallet/accountService';
import { getPassphrase } from 'pages/IncWebWallet/services/wallet/passwordService';
import { batch } from 'react-redux';
import {
  burnerAddressSelector,
  default as accountSelector,
  default as accountSelectors,
} from 'state/account/account.selectors';
import { AppGetState, AppThunkDispatch } from 'state/index';
import { loadAllMasterKeyAccounts, switchMasterKey, updateMasterKey } from 'state/masterKey/masterKey.actions';
import {
  currentMasterKeySelector,
  masterlessKeyChainSelector,
  noMasterLessSelector,
} from 'state/masterKey/masterKey.selectors';
import { getDefaultAccountWalletSelector } from 'state/shared/shared.selectors';
import { reloadWallet } from 'state/webWallet/webWallet.actions';
import { walletSelector } from 'state/webWallet/webWallet.selectors';

import { AccountActionType } from './account.types';
const { Validator } = require('incognito-chain-web-js/build/web/wallet');

//--------------------------------------------------------------------
// Pure Functions (Pure Actions)
//--------------------------------------------------------------------
export const setAccount = (account: AccountModel) => ({
  type: AccountActionType.SET,
  payload: account,
});

export const setListAccount = (accounts: AccountModel[]) => ({
  type: AccountActionType.SET_LIST,
  payload: accounts,
});

export const removeAccount = (account: AccountModel) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  const state = getState();
  const wallet = walletSelector(state);
  try {
    try {
      accountService.removeCacheBalance(account, wallet);
    } catch {
      //
    }
    const { PrivateKey } = account;
    const { aesKey } = await getPassphrase();
    const masterKey = currentMasterKeySelector(state);
    const walletAccount = accountService.getAccount(account, wallet);
    const accountInfo = await walletAccount.getDeserializeInformation();
    if (!masterKey.deletedAccountIds) {
      masterKey.deletedAccountIds = [];
    }
    masterKey.deletedAccountIds.push(accountInfo.ID);
    wallet.deletedAccountIds = masterKey.deletedAccountIds;
    console.time('TIME_REMOVE_ACCOUNT');
    await accountService.removeAccount(PrivateKey, aesKey, wallet);
    console.timeEnd('TIME_REMOVE_ACCOUNT');
    batch(() => {
      dispatch(updateMasterKey(masterKey));
      dispatch({
        type: AccountActionType.REMOVE_BY_PRIVATE_KEY,
        data: PrivateKey,
      });
      dispatch(reloadWallet());
      dispatch(loadAllMasterKeyAccounts());
    });
    console.timeEnd('TOTAL_TIME_REMOVE_ACCOUNT');
    return true;
  } catch (e) {
    console.log('REMOVE ACCOUNT ERROR', e);
    throw e;
  }
};

export const getBalanceStart = (accountName: string) => ({
  type: AccountActionType.GET_BALANCE,
  data: accountName,
});

export const getBalanceFinish = (accountName: string) => ({
  type: AccountActionType.GET_BALANCE_FINISH,
  data: accountName,
});

const setSignPublicKeyEncode = (signPublicKeyEncode: any) => {
  return {
    type: AccountActionType.SET_SIGN_PUBLIC_KEY_ENCODE,
    signPublicKeyEncode,
  };
};

export const actionUpdateDefaultAccount = (account: any) => ({
  type: AccountActionType.SET_DEFAULT_ACCOUNT,
  payload: account,
});

export const actionSetSignPublicKeyEncode =
  (defaultAccount?: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      const state = getState();
      const wallet = walletSelector(state);
      const account = defaultAccount || accountSelectors.defaultAccountSelector(state);
      const signPublicKeyEncode = await accountService.getSignPublicKeyEncode({
        wallet,
        account,
      });
      if (signPublicKeyEncode) {
        dispatch(setSignPublicKeyEncode(signPublicKeyEncode));
      }
    } catch (error) {
      new ExHandler(error).showErrorToast();
    }
  };

export const actionSetFetchingNFT = () => ({
  type: AccountActionType.ACTION_FETCHING_NFT,
  data: { isFetching: true },
});

export const setDefaultAccount = (account: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    await dispatch(actionUpdateDefaultAccount(account));
  } catch (e) {
    new ExHandler(e).showErrorToast();
  } finally {
    accountService.saveDefaultAccountToStorage(accountService.getAccountName(account));
  }
};

export const getBalance = (account: any) => async (dispatch: AppThunkDispatch, getState: AppGetState) => {};

export const reloadBalance = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {};

export const actionSwitchAccountFetching = () => ({
  type: AccountActionType.ACTION_SWITCH_ACCOUNT_FETCHING,
});

export const actionSwitchAccountFetched = () => ({
  type: AccountActionType.ACTION_SWITCH_ACCOUNT_FETCHED,
});

export const actionSwitchAccountFetchFail = () => ({
  type: AccountActionType.ACTION_SWITCH_ACCOUNT_FETCH_FAIL,
});

export const actionSwitchAccount =
  (accountName: any, shouldLoadBalance = true) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    try {
      new Validator('actionSwitchAccount-accountName', accountName).required().string();
      new Validator('actionSwitchAccount-shouldLoadBalance', shouldLoadBalance).boolean();
      const state = getState();
      const account: any = accountSelector.getAccountByName1(state)(accountName);
      console.log('actionSwitchAccount account ', account);
      const masterKey: MasterKeyModel = currentMasterKeySelector(state);
      const defaultAccountName = accountSelector.defaultAccountNameSelector(state);
      if (defaultAccountName !== account?.name) {
        await dispatch(switchMasterKey(masterKey?.name, accountName));
      }
      return account;
    } catch (error) {
      throw error;
    }
  };

export const actionFetchingCreateAccount = () => ({
  type: AccountActionType.ACTION_FETCHING_CREATE_ACCOUNT,
});

export const actionFetchedCreateAccount = () => ({
  type: AccountActionType.ACTION_FETCHED_CREATE_ACCOUNT,
});

export const actionFetchFailCreateAccount = () => ({
  type: AccountActionType.ACTION_FETCH_FAIL_CREATE_ACCOUNT,
});

export const actionFetchCreateAccount =
  ({ accountName }: any) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    // console.time('TOTAL_TIME_CREATE_ACCOUNT');
    const state = getState();
    const create = accountSelector.createAccountSelector(state);
    let wallet = walletSelector(state);
    const masterKey: MasterKeyModel = currentMasterKeySelector(state);
    let serializedAccount: any;
    if (create || !accountName || !wallet) {
      return;
    }
    try {
      dispatch(actionFetchingCreateAccount());
      const account = await accountService.createAccount(accountName, wallet);
      serializedAccount = new AccountModel(accountService.toSerializedAccountObj(account));
      batch(() => {
        dispatch(actionFetchedCreateAccount());
        if (serializedAccount?.name) {
          dispatch(switchMasterKey(masterKey?.name, serializedAccount?.name));
          dispatch(loadAllMasterKeyAccounts());
        }
      });

      // console.log('[actionFetchCreateAccount]  end ');
      // console.timeEnd('TOTAL_TIME_CREATE_ACCOUNT');
      return serializedAccount;
    } catch (error) {
      dispatch(actionFetchFailCreateAccount());
      throw error;
    }
  };

export const actionFetchingImportAccount = () => ({
  type: AccountActionType.ACTION_FETCHING_IMPORT_ACCOUNT,
});

export const actionFetchedImportAccount = () => ({
  type: AccountActionType.ACTION_FETCHED_IMPORT_ACCOUNT,
});

export const actionFetchFailImportAccount = () => ({
  type: AccountActionType.ACTION_FETCH_FAIL_IMPORT_ACCOUNT,
});

export const actionFetchImportAccount =
  ({ accountName, privateKey }: any) =>
  async (dispatch: AppThunkDispatch, getState: AppGetState) => {
    const state = getState();
    const importAccount = accountSelector.importAccountSelector(state);
    const masterless = masterlessKeyChainSelector(state);
    const masterKeys = noMasterLessSelector(state);
    let selectedMasterKey = masterless;
    if (!!importAccount || !accountName || !privateKey) {
      return;
    }
    try {
      dispatch(actionFetchingImportAccount());
      const { aesKey } = await getPassphrase();
      for (const masterKey of masterKeys) {
        try {
          const isCreated = await masterKey.wallet.hasCreatedAccount(privateKey);
          if (isCreated) {
            selectedMasterKey = masterKey;
            break;
          }
        } catch (e) {
          console.debug('CHECK CREATED ERROR', e);
        }
      }
      let wallet = selectedMasterKey?.wallet;
      const isImported = await accountService.importAccount(privateKey, accountName, aesKey, wallet);
      if (isImported) {
        batch(() => {
          dispatch(switchMasterKey(selectedMasterKey?.name || '', accountName));
          dispatch(actionFetchedImportAccount());
          dispatch(loadAllMasterKeyAccounts());
        });
      } else {
        throw new Error('Import keychain error');
      }
      return isImported;
    } catch (error) {
      dispatch(actionFetchFailImportAccount());
      throw error;
    }
  };

export const actionFetchBurnerAddress = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    const state = getState();
    const burnerAddress = burnerAddressSelector(state);
    if (burnerAddress) {
      return;
    }
    const account = getDefaultAccountWalletSelector(state);
    const payload = await account.getBurnerAddress();
    await dispatch({
      type: AccountActionType.ACTION_GET_BURNER_ADDRESS,
      payload,
    });
  } catch (error) {
    new ExHandler(error).showErrorToast();
  }
};

export const actionFetchedNFT = (payload: any) => ({
  type: AccountActionType.ACTION_FETCHED_NFT,
  payload,
});

export const actionToggleModalMintMoreNFT = (payload: any) => ({
  type: AccountActionType.ACTION_TOGGLE_MODAL_MINT_MORE_NFT,
  payload,
});

export const actionLogout = () => ({
  type: AccountActionType.ACTION_LOGOUT,
});
