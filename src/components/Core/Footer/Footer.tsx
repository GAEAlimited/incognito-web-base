import { Col, Row } from 'antd';
import { route as PolicyRoute } from 'pages/Policy/Policy.route';
import { route as TermRoute } from 'pages/TermOfService/TermOfService.route';
import React, { memo } from 'react';

import { Styled } from './Footer.styled';

const Footer = () => {
  return (
    <Styled className="default-padding-horizontal">
      <Col className="wrap-branch">
        <p className="normal-label">© 2022 Incognito</p>
      </Col>
      <Row className="wrap-social">
        <button
          className="normal-label button-text"
          onClick={() => {
            window.open(TermRoute);
          }}
        >
          Terms of Service
        </button>
        <button
          className="normal-label button-text default-margin-left"
          onClick={() => {
            window.open(PolicyRoute);
          }}
        >
          Privacy Policy
        </button>
      </Row>
      <Row className="wrap-social">
        <button
          className="normal-label button-text"
          onClick={() => {
            window.open('https://incognito.org/mediakit', '_blank');
          }}
        >
          Media Kit
        </button>
        <button
          className="normal-label default-margin-left button-text"
          onClick={() => {
            window.open('https://t.me/incognitochain', '_blank');
          }}
        >
          Telegram
        </button>
        <button
          className="normal-label default-margin-left button-text"
          onClick={() => {
            window.open('https://twitter.com/IncognitoChain', '_blank');
          }}
        >
          Twitter
        </button>
      </Row>
    </Styled>
  );
};

export default memo(Footer);
