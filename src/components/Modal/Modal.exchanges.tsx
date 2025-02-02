import Column from 'components/Core/Column';
import Row from 'components/Core/Row';
import { formatExchangeName, getExchangeLogo } from 'pages/Swap/features/Selection/SelectSwapExchange';
import React from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { useModal } from './Modal.provider';

const Styled = styled(Column)`
  width: 100%;
  overflow-y: auto;
  max-height: 40vh;
  margin-top: 24px;
`;

const Item = styled(Row)`
  padding: 12px 0 12px 12px;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.bg4};
    transition: 0.2s all ease;
  }
  :active {
    opacity: 0.8;
  }
  .logo {
    width: 24px;
    height: 24px;
  }
`;

interface IProps {
  exchanges: any;
  onSelect: () => void;
}

const ExchangeModal = (props: IProps & any) => {
  const { exchanges, onSelect } = props;
  const { closeModal } = useModal();
  const renderItem = (exchange: any) => {
    return (
      <Item
        key={exchange?.exchangeName}
        onClick={() => {
          closeModal();
          onSelect(exchange?.exchangeName);
        }}
      >
        <img
          className="logo"
          alt=""
          src={getExchangeLogo(exchange?.exchangeName)}
          style={{ width: 32, height: 32, marginRight: 12 }}
        />
        <ThemedText.RegularLabel className="name" color="primary5">
          {formatExchangeName(exchange?.exchangeName)}
        </ThemedText.RegularLabel>
      </Item>
    );
  };

  return <Styled>{exchanges.map(renderItem)}</Styled>;
};

ExchangeModal.displayName = 'ExchangeModal';

export default ExchangeModal;
