import { Trans } from '@lingui/macro';
import { Connector } from '@web3-react/types';
import { ButtonEmpty, ButtonPrimary } from 'components/Core/Button';
import Loader from 'components/Core/Loader';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const PendingSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`;

const LoaderContainer = styled.div`
  margin: 16px 0;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: center;
`;

const LoadingMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: center;
  border-radius: 12px;

  & > * {
    padding: 1rem;
  }
`;

const ErrorGroup = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: flex-start;
`;

const LoadingWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
`;

export default function PendingView({
  connector,
  error = false,
  tryActivation,
  openOptions,
}: {
  connector: Connector;
  error?: boolean;
  tryActivation: (connector: Connector) => void;
  openOptions: () => void;
}) {
  return (
    <PendingSection>
      <LoadingMessage>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <ThemedText.MediumLabel marginBottom={12}>
                <Trans>Error connecting</Trans>
              </ThemedText.MediumLabel>
              <ThemedText.Body fontSize={14} marginBottom={36} textAlign="center">
                The connection attempt failed. Please click try again and follow the steps to connect in your wallet.
              </ThemedText.Body>
              <ButtonPrimary
                $borderRadius="12px"
                padding="12px"
                onClick={() => {
                  tryActivation(connector);
                }}
              >
                Try Again
              </ButtonPrimary>
              <ButtonEmpty width="fit-content" padding="0" marginTop={20}>
                <ThemedText.Link fontSize={12} onClick={openOptions}>
                  Back to wallet selection
                </ThemedText.Link>
              </ButtonEmpty>
            </ErrorGroup>
          ) : (
            <>
              <ThemedText.Black fontSize={20} marginY={16}>
                <LoaderContainer>
                  <Loader stroke="currentColor" size="32px" color="white" />
                </LoaderContainer>
                Connecting...
              </ThemedText.Black>
            </>
          )}
        </LoadingWrapper>
      </LoadingMessage>
    </PendingSection>
  );
}
