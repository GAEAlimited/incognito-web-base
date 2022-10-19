import { Button, Col, Row } from 'antd';
import logoStrokeImg from 'assets/images/logo-stroke.png';
import SectionHead from 'components/Core/SectionHead';
import { structureTranslateSelector } from 'config/Configs.selector';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

import { route as ValidatorRoute } from '../../Earnings/features/Validators/Validators.route';

const Styled = styled(Row)`
  .main-title {
    font-weight: 500;
    letter-spacing: 0.015em;
    white-space: pre-wrap;
  }
  .sub-main-title {
    max-width: 620px;
    letter-spacing: 0.01em;
  }
  .logo-stroke {
    width: 35%;
    max-width: 432px;
  }
  .btn-become-validator {
    margin-top: 50px;
    width: 196px;
  }
  .col-section1 {
    display: flex;
    flex-direction: column;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .logo-stroke {
        width: 35%;
        max-width: 390px;
      }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      justify-content: center;
      flex-direction: column-reverse;
      .col-section1 {
        display: flex;
        flex-direction: column;
      }
      .main-title {
        font-weight: 500;
        white-space: inherit;
      }
      .sub-main-title {
        font-size: 16px;
        line-height: 24px;
      }
      .btn-become-validator {
        margin-top: 24px;
        height: 50px;
        font-size: 18px;
      }
      .logo-stroke {
        width: 170px;
        height: 170px;
        margin-bottom: 45px;
      }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      .main-title {
        white-space: pre-wrap;
        text-align: left;
      }

      .btn-become-validator {
        // align-self: center;
      }
  `}
`;

const Section1 = () => {
  const structureTrs = useSelector(structureTranslateSelector);
  const history = useHistory();
  return (
    <Styled
      align="middle"
      justify="space-between"
      className="default-padding-horizontal default-margin-top default-margin-bottom"
    >
      <Col className="col-section1 ">
        <SectionHead title="Privacy Infrastructure" />
        <p className="main-title main-title-text">{structureTrs.mainTitle}</p>
        <p className="sub-main-title sub-title-text text2">{structureTrs.mainDesc}</p>
        <Button
          type="primary"
          shape="round"
          size="large"
          className="button1 btn-become-validator"
          onClick={() => {
            history.push(ValidatorRoute);
          }}
        >
          {structureTrs.becomeValidator}
        </Button>
      </Col>
      <img src={logoStrokeImg} className="logo-stroke" alt="logo-stroke" />
    </Styled>
  );
};

export default React.memo(Section1);