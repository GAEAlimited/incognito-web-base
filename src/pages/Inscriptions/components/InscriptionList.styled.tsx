import { Spin } from 'antd';
import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

export const Container = styled.div`
  flex: 1;
  /* background-color: black; */
  height: auto;
`;

export const InfiniteScrollContainer = styled.div`
  overflow: scroll;
  flex-direction: column;
  /* background-color: grey; */

  ${MediaQueryBuilder(
    'upToLarge',
    css`
      padding: 1.2rem;
    `
  )}
  ${MediaQueryBuilder(
    'upToMedium',
    css`
      padding: 1.5rem;
    `
  )}

  .gridView {
    min-height: 50vh;
    display: grid;
    flex: 1;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);

    ${MediaQueryBuilder(
      'upToLarge',
      css`
        grid-template-columns: repeat(3, 1fr);
      `
    )}

    ${MediaQueryBuilder(
      'upToMedium',
      css`
        grid-template-columns: repeat(2, 1fr);
      `
    )}
    ${MediaQueryBuilder(
      'upToSmall',
      css`
        grid-template-columns: repeat(1, 1fr);
      `
    )}
  }

  .load-more-loading {
    width: 100%;
    height: 100px;
    margin-top: 30px;
    /* background-color: yellow; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const SpinStyled = styled(Spin)`
  .ant-spin-dot-item {
    background-color: white !important;
  }
  .ant-spin-text {
    color: white !important;
    font-size: 16px;
    font-weight: 600;
  }
`;
