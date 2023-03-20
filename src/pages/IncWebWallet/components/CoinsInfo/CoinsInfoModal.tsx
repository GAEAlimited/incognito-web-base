import { Modal } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { useModal } from 'components/Modal';
import Loading from 'components/Modal/Modal.loading';
import { uniq } from 'lodash';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { incognitoAccountFollowTokenIDs } from 'state/incognitoWallet';
import styled from 'styled-components/macro';

import { getFollowTokenSelectedTokenSelector } from '../../state/followTokenSelected.selectors';
import HistoryItem, { IHistoryItem } from '../HistoryItem';
import NavigationHeader from '../NavigationHeader/NavigationHeader';
import enhance from './CoinsInfoModal.enhance';
const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    background: ${({ theme }) => theme.color_grey1};
    border-radius: 20px;
    width: 430px;
    min-height: 670px;
  }
`;

const Container = styled.div<{ isVerified: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color_grey1};

  .verify {
    color: ${({ theme, isVerified }: { theme: any; isVerified: boolean }) => (isVerified ? '#34C759' : '#FF9500')};
    margin-bottom: 16px;
    margin-top: 16px;
  }
  .name-text {
    margin-bottom: 6px;
  }
`;

interface Props {
  data?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  infosFactories?: IHistoryItem[];
  isAddToken?: boolean;
  onSuccess?: () => void;
}

const CoinsInfoModal = (props: Props & any): any => {
  const { isModalOpen, onCloseModal, infosFactories = [], isAddToken = false, onSuccess = () => {} } = props;
  const { setModal, closeModal } = useModal();
  const followTokenSelected: SelectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);
  const { symbol, network, shortName, isVerified, tokenID } = followTokenSelected;
  const followedTokenIDList: any[] = useSelector(incognitoAccountFollowTokenIDs) as any[];
  const accountSender = useSelector(defaultAccountWalletSelector);
  const importToken = async () => {
    try {
      //Show Loading...
      setModal({
        closable: false,
        data: <Loading />,
        isTransparent: false,
        rightHeader: undefined,
        title: '',
        hideHeaderDefault: true,
      });
      //push new token to list token before...
      followedTokenIDList.push(tokenID);

      //Remove duplicate tokenID
      const newFollowed = uniq(followedTokenIDList);

      // SAVE new list token to storage by SDK
      await accountSender.addListFollowingToken({
        tokenIDs: newFollowed,
      });

      setTimeout(() => {
        //Close Loading...
        closeModal();
        toast.success('Import Token Success');
        onSuccess && onSuccess();
      }, 300);
    } catch (error) {
      console.log('[importToken] error: ', error);
      closeModal();
    }
  };

  return (
    <ModalWrapper
      open={isModalOpen}
      footer={null}
      style={{ top: 42, right: 0, left: 45 }}
      closable={false}
      maskClosable={false}
      onCancel={() => onCloseModal?.()}
      destroyOnClose={true}
    >
      <Container isVerified>
        <NavigationHeader
          leftTitle={'Coin Info'}
          onBack={() => {
            onCloseModal?.();
          }}
        />

        <p className="name-text fs-supermedium fw-bold fs-medium">{shortName}</p>
        <p className="fs-regular">{`${symbol} (${network ? network : 'Incognito'})`}</p>
        <p className="verify fw-medium fs-medium">{isVerified ? 'Verified' : 'Unverified'}</p>
        {infosFactories.map((item: IHistoryItem) => (
          <HistoryItem key={item.title} {...item} />
        ))}

        {isAddToken && (
          <ButtonConfirmed height={'50px'} type="submit" onClick={importToken}>
            {'Import Token'}
          </ButtonConfirmed>
        )}
      </Container>
    </ModalWrapper>
  );
};

export default enhance(CoinsInfoModal);
