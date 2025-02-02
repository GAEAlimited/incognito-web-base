import { validator } from 'components/Core/ReduxForm';
import React from 'react';

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const { isIncognitoAddress, onChangeField, incAccount, inputAddress } = props;
    const refObject = React.useRef(false);
    const getExternalAddressValidator = React.useCallback(() => {
      // default
      return validator.combinedUnknownAddress;
    }, [isIncognitoAddress]);

    const getAddressValidator = React.useCallback(() => {
      return validator.combinedIncognitoAddress;
    }, [isIncognitoAddress]);

    const getWarningAddress = React.useCallback(() => {
      // if (isExternalAddress) {
      //   return 'You are exiting Incognito and going public.';
      // }
      // return "You are exiting Incognito and going public.";
    }, []);

    const validateAddress = getAddressValidator();
    const warningAddress = getWarningAddress();

    // React.useEffect(() => {
    //   if (refObject && refObject.current) return;
    //   if (incAccount && incAccount.paymentAddress && onChangeField) {
    //     onChangeField(incAccount.paymentAddress, FORM_CONFIGS.toAddress);
    //     refObject.current = true;
    //   }
    // }, [incAccount]);

    return <WrappedComponent {...{ ...props, validateAddress, warningAddress }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceAddressValidation';
  return FormDepositComp;
};

export default enhanceAddressValidation;
