import { Trans } from '@lingui/macro';
import { Connector } from '@web3-react/types';
import { ReactComponent as Close } from 'assets/images/x.svg';
import CopyHelper from 'components/Core/AccountDetails/Copy';
import { ButtonSecondary } from 'components/Core/Button';
import StatusIcon from 'components/Core/Identicon/StatusIcon';
import { injected } from 'connectors';
import { SUPPORTED_WALLETS } from 'constants/wallet';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import React from 'react';
import { ExternalLink as LinkIcon } from 'react-feather';
import styled from 'styled-components/macro';
import { ExternalLink, ThemedText } from 'theme';
import { shortenAddress } from 'utils';
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink';

import { useAppDispatch } from '../../../state/hooks';
import { updateSelectedWallet } from '../../../state/user/reducer';

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const InfoCard = styled.div`
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  padding-bottom: 24px;
`;

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;

const AccountSection = styled.div`
  padding: 0rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`;

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`;

const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`;

const AccountControl = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  align-items: center;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  color: ${({ theme }) => theme.text1};
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const CloseColor = styled(Close)`
  path {
    color: ${({ theme }) => theme.text4};
  }
`;

const WalletName = styled(ThemedText.SmallLabel)`
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primary8};
`;

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`;

function WrappedStatusIcon({ connector }: { connector: Connector }) {
  return (
    <IconWrapper size={16}>
      <StatusIcon connector={connector} />
    </IconWrapper>
  );
}

const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 6px 12px;
  background-color: ${({ theme }) => theme.primary14};
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

interface AccountDetailsProps {
  toggleWalletModal: () => void;
  pendingTransactions: string[];
  confirmedTransactions: string[];
  ENSName?: string;
  openOptions: () => void;
}

export default function AccountDetails({ toggleWalletModal, ENSName, openOptions }: AccountDetailsProps) {
  const { chainId, account, connector } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  function formatConnectorName() {
    const { ethereum } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0];
    return <WalletName>Connected with {name}</WalletName>;
  }

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>
          <ThemedText.AvgMediumLabel color="primary5">Account</ThemedText.AvgMediumLabel>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>{formatConnectorName()}</AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>
                  {ENSName ? (
                    <>
                      <div>
                        {connector && <WrappedStatusIcon connector={connector} />}
                        <p> {ENSName}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {connector && <WrappedStatusIcon connector={connector} />}
                        <ThemedText.RegularLabel> {account && shortenAddress(account)}</ThemedText.RegularLabel>
                      </div>
                      <div>
                        {/* Coinbase Wallet reloads the page right now, which breaks the selectedWallet from being set properly on localStorage */}
                        {/*{connector !== coinbaseWallet && (*/}
                        <WalletAction
                          style={{ fontSize: '.825rem', fontWeight: 500, marginRight: '8px' }}
                          onClick={() => {
                            connector.deactivate ? connector.deactivate() : connector.resetState();
                            dispatch(updateSelectedWallet({ wallet: undefined }));
                            openOptions();
                          }}
                          data-cy="wallet-disconnect"
                        >
                          Disconnect
                        </WalletAction>
                        {/*)}*/}
                        <WalletAction
                          style={{ fontSize: '.825rem', fontWeight: 500 }}
                          onClick={() => {
                            openOptions();
                          }}
                          data-cy="wallet-change"
                        >
                          Change
                        </WalletAction>
                      </div>
                    </>
                  )}
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                {ENSName ? (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <CopyHelper toCopy={account} iconPosition="left">
                            <span style={{ marginLeft: '4px', fontSize: 16 }}>
                              <Trans>Copy Address</Trans>
                            </span>
                          </CopyHelper>
                        )}
                        {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={true}
                            href={getExplorerLink(chainId, ENSName, ExplorerDataType.ADDRESS)}
                          >
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: '4px', fontSize: 16 }}>
                              <Trans>View on Explorer</Trans>
                            </span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                ) : (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <CopyHelper toCopy={account} iconPosition="left">
                            <span style={{ marginLeft: '4px', fontSize: 16 }}>
                              <Trans>Copy Address</Trans>
                            </span>
                          </CopyHelper>
                        )}
                        {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={false}
                            href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
                          >
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: '4px', fontSize: 16 }}>View on Explorer</span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                )}
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      {/*{!!pendingTransactions.length || !!confirmedTransactions.length ? (*/}
      {/*  <LowerSection>*/}
      {/*    <AutoRow mb={'1rem'} style={{ justifyContent: 'space-between' }}>*/}
      {/*      <ThemedText.Body>*/}
      {/*        <Trans>Recent Transactions</Trans>*/}
      {/*      </ThemedText.Body>*/}
      {/*      <LinkStyledButton onClick={clearAllTransactionsCallback}>*/}
      {/*        <Trans>(clear all)</Trans>*/}
      {/*      </LinkStyledButton>*/}
      {/*    </AutoRow>*/}
      {/*    {renderTransactions(pendingTransactions)}*/}
      {/*    {renderTransactions(confirmedTransactions)}*/}
      {/*  </LowerSection>*/}
      {/*) : (*/}
      {/*  <LowerSection>*/}
      {/*    <ThemedText.Body color={theme.text1}>*/}
      {/*      <Trans>Your transactions will appear here...</Trans>*/}
      {/*    </ThemedText.Body>*/}
      {/*  </LowerSection>*/}
      {/*)}*/}
    </>
  );
}
