import { Connector } from '@web3-react/types';
import { coinbaseWallet, fortmatic, gnosisSafe, injected, network, walletConnect } from 'connectors';
import { CHAIN_INFO } from 'constants/chainInfo';
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains';

function getRpcUrls(chainId: SupportedChainId): [string] {
  switch (chainId) {
    case SupportedChainId.MAINNET:
    case SupportedChainId.KOVAN:
    case SupportedChainId.OPTIMISM:
      return ['https://mainnet.optimism.io'];
    case SupportedChainId.OPTIMISTIC_KOVAN:
      return ['https://kovan.optimism.io'];
    case SupportedChainId.POLYGON:
      return ['https://polygon-rpc.com/'];
    case SupportedChainId.POLYGON_MUMBAI:
      return ['https://rpc-endpoints.superfluid.dev/mumbai'];
    case SupportedChainId.BSC:
      return ['https://bsc-dataseed.binance.org/'];
    default:
  }
  // Our API-keyed URLs will fail security checks when used with external wallets.
  throw new Error('RPC URLs must use public endpoints');
}

export function isChainAllowed(connector: Connector, chainId: number) {
  switch (connector) {
    case fortmatic:
      return chainId === SupportedChainId.MAINNET;
    case injected:
    case coinbaseWallet:
    case walletConnect:
    case network:
    case gnosisSafe:
      return ALL_SUPPORTED_CHAIN_IDS.includes(chainId);
    default:
      return false;
  }
}

export const switchChain = async (connector: Connector, chainId: number) => {
  if (!isChainAllowed(connector, chainId)) {
    throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`);
  } else if (connector === walletConnect || connector === network) {
    await connector.activate(chainId);
  } else {
    const info = CHAIN_INFO[chainId];
    const addChainParameter = {
      chainId,
      chainName: info.label,
      rpcUrls: getRpcUrls(chainId),
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: [info.explorer],
    };
    await connector.activate(addChainParameter);
  }
};
