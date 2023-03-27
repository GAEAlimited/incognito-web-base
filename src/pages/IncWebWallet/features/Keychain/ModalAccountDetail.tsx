import { message } from 'antd';
import { useModal } from 'components/Modal';
import copy from 'copy-to-clipboard';
import withBlur from 'pages/IncWebWallet/hoc/withBlur';
import { MdContentCopy, MdQrCode } from 'react-icons/md';
import styled from 'styled-components/macro';

import QRCode from '../QRCode';
interface ExportItemProps {
  label: string;
  data: any;
  onClickQrCode?: () => void;
  requiredPass?: boolean;
  children?: any;
}

const ExportItemContainer = styled.div`
  padding: 8px 0px;
`;

const ExportItemTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const GroupButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemValue = styled.p`
  color: ${({ theme }) => theme.text2};
  word-wrap: break-word;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
`;

const ButtonCopy = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const ButtonQrCode = styled.div`
  margin-left: 8px;
  :hover {
    cursor: pointer;
  }
`;

const ExportItem = (props: ExportItemProps): any => {
  const { label, data, onClickQrCode, requiredPass } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const onCopy = (text: string) => {
    copy(text);
    messageApi.open({
      type: 'success',
      content: 'Copied',
    });
  };

  const renderMainContent = (): any => (
    <ExportItemContainer>
      {contextHolder}
      <ExportItemTopContainer>
        <p>{label}</p>
        <GroupButton>
          <ButtonCopy onClick={() => onCopy(data)}>
            <MdContentCopy size={20} color="#FFFFFF" />
          </ButtonCopy>
          <ButtonQrCode onClick={onClickQrCode}>
            <MdQrCode size={20} color="#FFFFFF" />
          </ButtonQrCode>
        </GroupButton>
      </ExportItemTopContainer>
      <ItemValue>{data}</ItemValue>
    </ExportItemContainer>
  );

  if (requiredPass) return withBlur(renderMainContent)(props);
  return renderMainContent();
};

export const parseShard = (bytes: any) => {
  const arr = bytes.split(',');
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

interface ModalAccountDetailProps {
  account?: any;
  token?: any;
  title?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export const ModalAccountDetail = (props: ModalAccountDetailProps) => {
  const { account } = props;

  const { setModal } = useModal();

  const onClickQrCode = (label: string, value: string) => {
    setModal({
      closable: false,
      data: <QRCode title={label} value={value} />,
      isTransparent: false,
      rightHeader: undefined,
      title: '',
      isSearchTokenModal: false,
      hideHeaderDefault: true,
    });
  };

  const renderItem = (label: any, value: any, requiredPass = false): any =>
    value ? (
      <ExportItem
        label={label}
        data={value}
        requiredPass={requiredPass}
        onClickQrCode={() => onClickQrCode(label, value)}
      />
    ) : null;
  return (
    <div style={{ flex: 1, backgroundColor: '#303030' }}>
      <h5>{account?.name} keys</h5>
      {renderItem('Your incognito address', account?.PaymentAddress)}
      {renderItem('Private key', account?.PrivateKey, true)}
      {renderItem('Public key', account?.PublicKeyCheckEncode)}
      {renderItem('Readonly key', account?.ReadonlyKey)}
      {renderItem('Validator key', account?.ValidatorKey)}
      {renderItem('Validator Public key', account?.BLSPublicKey)}
      {renderItem('OTA key', account?.OTAKey)}
      {renderItem('ID', account?.ID.toString())}
    </div>
  );
};
