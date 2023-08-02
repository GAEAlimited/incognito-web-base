import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  .title {
    letter-spacing: -0.01em;
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1rem;
    color: white;
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }

  .content {
    word-break: break-all;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.25rem;
    color: white;
  }
`;
