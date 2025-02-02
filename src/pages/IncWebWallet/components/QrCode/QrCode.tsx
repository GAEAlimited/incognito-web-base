import React from 'react';
import QRCodeReact from 'react-qr-code';
import styled from 'styled-components/macro';

import Copy from '../Copy';

interface IProps {
  hook?: any;
  qrCodeProps: any;
  label?: string;
  copyProps?: any;
  showCopyAddressBar?: boolean;
}

const Styled = styled.div`
  .copy-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    border-radius: 50px;
    padding: 0 15px;
    justify-content: space-between;
    margin-top: 30px;
  }
  .copy-block .btn-copy {
    height: 40px;
    border-radius: 40px;
    padding: 0 10px;
  }
  .copy-block p {
    max-width: 100%;
  }
  .label {
    text-align: center;
    margin-left: 54px;
    margin-right: 54px;
    color: white;
  }
  .qrcode-react {
    justify-content: center;
    display: flex;
    width: fit-content;
    padding: 8px;
    margin: auto;
    background: ${({ theme }) => theme.white};
    border-radius: 8px;
  }
`;

const QrCode = (props: IProps) => {
  const { hook, qrCodeProps, label, copyProps, showCopyAddressBar } = props;
  const { value } = qrCodeProps;
  return (
    <Styled className="qrcode-container">
      <div className="label fs-regular fw-medium">{label}</div>
      <div className="qrcode-react">
        <QRCodeReact {...{ ...qrCodeProps, size: qrCodeProps?.size || 184 }} bgColor="transparent" />
      </div>
      {hook}
      {showCopyAddressBar && <Copy text={value} {...copyProps} />}
    </Styled>
  );
};

export default QrCode;
