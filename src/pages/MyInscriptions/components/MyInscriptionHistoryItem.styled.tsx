import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  min-height: 200px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color_grey2};
  gap: 1rem;

  .eventSend {
    font-weight: 700;
    color: ${({ theme }) => theme.primary15};
  }
  .eventCreate {
    font-weight: 700;
    color: ${({ theme }) => theme.primary2};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const Title = styled.p`
  letter-spacing: -0.01em;
  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1rem;
  color: white;
  opacity: 0.7;
  word-wrap: break-word;
  color: ${({ theme }) => theme.primary5};
`;

export const Content = styled.div`
  overflow-wrap: break-word;
  word-break: break-all;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25rem;
  color: white;
`;
