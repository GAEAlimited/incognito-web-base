import { InputContainer } from 'components/Core/ReduxForm/InputField/InputField.styled';
import { ExchangeModal, useModal } from 'components/Modal';
import React from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { SwapExchange } from '../FormUnshield/FormUnshield.types';

export interface ISelectSwapExchange {
  exchanges: any[];
  onSelectExchange: (exchange: SwapExchange) => void;
  exchangeSelected: any;
}

const ArrowDown = styled(ChevronDown)<{ open?: boolean }>`
  color: ${({ theme }) => theme.primary8};
`;

const ItemStyled = styled(InputContainer)`
  cursor: pointer;
  :hover {
    opacity: 0.9;
    transition: 0.2s all ease;
    padding-right: 18px;
    padding-left: 18px;
  }
`;

export const SelectSwapExchange = React.memo((props: ISelectSwapExchange) => {
  const { onSelectExchange, exchangeSelected, exchanges } = props;
  const { setModal } = useModal();

  const showExchangesModal = () => {
    if (exchanges?.length < 2) return;
    setModal({
      closable: true,
      data: <ExchangeModal exchanges={exchanges} onSelect={onSelectExchange} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select exchange',
    });
  };

  return (
    <div style={{ marginTop: 8, marginBottom: 16 }}>
      <ThemedText.SmallLabel fontWeight={400} color="primary8" marginBottom="4px">
        Exchange
      </ThemedText.SmallLabel>
      <ItemStyled onClick={showExchangesModal} className="border-hover input-container input-amount">
        <ThemedText.RegularLabel fontWeight={500}>{exchangeSelected}</ThemedText.RegularLabel>
        <ArrowDown size={24} />
      </ItemStyled>
    </div>
  );
});

SelectSwapExchange.displayName = 'SelectSwapExchange';

export default SelectSwapExchange;