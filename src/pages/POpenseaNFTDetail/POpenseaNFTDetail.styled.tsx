import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled.div`
  padding-bottom: 40px;
  width: 100%;
`;

export const WrapperContent = styled.div`
  width: 100%;

  .content {
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-top: 16px;
  }
  .section-1 {
    display: flex;
    flex: 0.45;
    margin-right: 32px;

    .content-1 {
      width: 100%;
    }

    .img-nft {
      width: 100%;
      aspect-ratio: 1 / 1;
      background-color: ${({ theme }) => theme.bg4};
      object-fit: contain;
      border-radius: 24px;
    }
  }

  .section-2 {
    flex: 0.55;
    display: flex;
    flex-direction: column;

    .artis-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .artis {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: ${({ theme }) => theme.color_blue};
      margin-right: 8px;
    }

    .name {
      font-weight: 700;
      font-size: 34px;
      line-height: 140%;
      margin-top: 8px;
    }

    .owner-by {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      margin-top: 4px;
    }

    .view-container {
      display: flex;
      flex-direction: row;
      margin-top: 24px;
    }

    .view-content {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .view-title {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      margin-left: 8px;
      margin-right: 40px;
    }

    .price-container {
      margin-top: 40px;
      border: 1px solid ${({ theme }) => theme.border1};
      border-radius: 12px;
      padding: 16px;
    }

    .time-sale {
      font-weight: 400;
      font-size: 14px;
      margin-left: 8px;
      color: ${({ theme }) => theme.content2};
    }

    .price-indicator {
      height: 1px;
      margin-top: 16px;
      background-color: ${({ theme }) => theme.border1};
    }

    .buy-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
    }

    .current-price {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: ${({ theme }) => theme.color_grey};
    }

    .price-view {
      display: flex;
      flex-direction: column;
    }

    .price {
      display: flex;
      flex-direction: row;
      margin-top: 4px;
      align-items: center;
    }

    .price-coin {
      font-weight: 700;
      font-size: 24px;
      line-height: 140%;
    }

    .price-usd {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      margin-left: 8px;
      color: ${({ theme }) => theme.color_grey};
    }

    .btn-buy {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 50px;
      left: 1129px;
      top: 385px;

      background-color: ${({ theme }) => theme.color_blue};
      border-radius: 8px;
    }

    .text-buy {
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      text-align: center;
    }

    .child-desc {
      margin-top: 16px;
    }

    .child-desc-title {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;

      color: ${({ theme }) => theme.text2};
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
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    .content {
      flex-direction: column;
    }

    .section-2 {
      margin-top: 16px;

      .price-coin {
        font-size: 18px;
      }

      .price-usd {
        font-size: 14px;
      }
    }

  `}
`;
