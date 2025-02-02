/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { List } from 'antd';
import icAbout from 'assets/svg/ic-about.svg';
import icDesciption from 'assets/svg/ic-description.svg';
import icInfo from 'assets/svg/ic-info.svg';
import icProperties from 'assets/svg/ic-properties.svg';
import icVerify from 'assets/svg/ic-verify.svg';
import Expandable from 'components/Expandable';
import { POpenseaNft } from 'models/model/POpenseaNFT';
import React, { memo } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { shortenPrefixString, shortenString } from 'utils';

export const Styled = styled.div`
  margin-top: 16px;

  .child-desc {
    margin-top: 24px;
  }

  .child-desc-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 16px;
  }

  .child-desc-name {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;

    color: ${({ theme }) => theme.white};
    margin-right: 6px;
  }

  .child-desc-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;

    color: ${({ theme }) => theme.text2};
    margin-right: 6px;
  }

  .child-detail {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
  }

  .child-detail-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }

  .child-detail-title {
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme.content2};
  }

  .child-detail-value {
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    text-align: right;
  }

  .list-properties {
    margin-top: 24px;
  }

  .properties-item {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 16px;
    background-color: ${({ theme }) => theme.bg1};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    height: 78px;
  }

  .properties-trait-type {
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color_blue};
    text-align: center;
  }

  .properties-trait-value {
    font-weight: 400;
    font-size: 15px;
    line-height: 140%;
    margin-top: 2px;
    text-align: center;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
  `}
`;

interface POpenseaNFTDetailInfoProps {
  selectedNFT: POpenseaNft;
}

const POpenseaNFTDetailInfo = (props: POpenseaNFTDetailInfoProps) => {
  const { selectedNFT } = props;

  const collection = selectedNFT.collection;

  const renderDetailItem = (title: string, value?: string) => (
    <div className="child-detail-item">
      <p className="child-detail-title">{title}</p>
      <p className="child-detail-value">{value}</p>
    </div>
  );

  const renderDetailsChild = () => {
    const assetContract = selectedNFT.assetContract;
    const creatorFee =
      assetContract && assetContract.openseaSellerFeeBasisPoints
        ? `${Math.round(assetContract.openseaSellerFeeBasisPoints / 100)}%`
        : '';

    const details = [
      {
        title: 'Contract Address',
        value: assetContract && assetContract.address ? shortenString(assetContract.address) : '',
      },
      { title: 'Token ID', value: selectedNFT.tokenId ? shortenPrefixString(`${selectedNFT.tokenId}`) : '' },
      { title: 'Token Standard', value: assetContract ? assetContract.schemaName : '' },
      { title: 'Chain', value: 'Etherum' },
      { title: 'Creator Fee', value: creatorFee },
    ];
    return <div className="child-detail">{details.map((item) => renderDetailItem(item.title, item.value))}</div>;
  };

  const renderDesciptionChild = () => (
    <div className="child-desc">
      <div className="child-desc-content">
        <p className="child-desc-title">By</p>
        <p className="child-desc-name">{collection?.name}</p>
        {collection && collection.getIsVerify() && <img src={icVerify} />}
      </div>
      <p className="child-desc-title">{selectedNFT.description}</p>
    </div>
  );

  const renderPropertiesChild = () => (
    <List
      className="list-properties"
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 3,
      }}
      dataSource={selectedNFT.traits || []}
      renderItem={(trait, index: number) => {
        return (
          <List.Item key={index.toString()}>
            <div key={index.toString()} className="properties-item">
              <p className="properties-trait-type">{trait.traitType}</p>
              <p className="properties-trait-value">{trait.value}</p>
              <p></p>
            </div>
          </List.Item>
        );
      }}
    />
  );
  const renderAboutChild = () => (
    <div className="child-desc">
      <p className="child-desc-title">{collection?.description}</p>
    </div>
  );

  return (
    <Styled>
      <Expandable icon={icDesciption} expand title="Desciption" child={renderDesciptionChild()} />
      <Expandable icon={icProperties} title="Properties" child={renderPropertiesChild()} />
      <Expandable icon={icAbout} title={`About ${collection?.name}`} child={renderAboutChild()} />
      <Expandable icon={icInfo} title="Details" child={renderDetailsChild()} />
    </Styled>
  );
};

export default memo(POpenseaNFTDetailInfo);
