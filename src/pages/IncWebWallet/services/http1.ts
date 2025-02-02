import axios from 'axios';
import CONSTANT_CONFIGS from 'pages/IncWebWallet/constants/config';
import Server from 'pages/IncWebWallet/services/wallet/Server';

import { CustomError, ErrorCode, ExHandler } from './exception';

const HEADERS = { 'Content-Type': 'application/json' };
const TIMEOUT = 20000;

const instance = axios.create({
  baseURL: CONSTANT_CONFIGS.COINS_SERVICE_URL,
  timeout: TIMEOUT,
  headers: {
    ...HEADERS,
    Authorization: '',
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    const newConfig = {
      ...config,
    };
    const server = await Server.getDefault();
    const BASE_URL = server.coinServices;
    if (BASE_URL) {
      newConfig['baseURL'] = BASE_URL;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    const result = res?.data?.Result;
    return Promise.resolve(result);
  },
  (errorData) => {
    const errResponse = errorData?.response;

    // can not get response, alert to user
    if (errorData?.isAxiosError && !errResponse) {
      return new ExHandler(new CustomError(ErrorCode.network_make_request_failed)).throw();
    }

    // get response of error
    // wrap the error with CustomError to custom error message, or logging
    const data = errResponse?.data;
    if (data && data.Error) {
      throw new CustomError(data.Error?.Code, {
        name: CustomError.TYPES.API_ERROR,
        message: data.Error?.Message,
      });
    }

    return Promise.reject(errorData);
  }
);

export default instance;
