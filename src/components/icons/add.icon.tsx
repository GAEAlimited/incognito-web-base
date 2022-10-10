import * as React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

const CustomSVG = styled.svg`
  width: 72px;
  height: 72px;
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      width: 56px;
      height: 56px;
  `}
`;

const AddIcon = () => (
  <CustomSVG viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx={36} cy={36} r={36} fill="#1A1A1A" />
    <path
      d="M36 20C32.8355 20 29.7421 20.9384 27.1109 22.6965C24.4797 24.4546 22.4289 26.9534 21.2179 29.8771C20.0069 32.8007 19.6901 36.0177 20.3074 39.1214C20.9248 42.2251 22.4487 45.0761 24.6863 47.3137C26.9239 49.5513 29.7749 51.0752 32.8786 51.6926C35.9823 52.3099 39.1993 51.9931 42.1229 50.7821C45.0466 49.5711 47.5454 47.5203 49.3035 44.8891C51.0616 42.2579 52 39.1645 52 36C52 31.7565 50.3143 27.6869 47.3137 24.6863C44.3131 21.6857 40.2435 20 36 20V20ZM36 48C33.6266 48 31.3066 47.2962 29.3332 45.9776C27.3598 44.6591 25.8217 42.7849 24.9135 40.5922C24.0052 38.3995 23.7676 35.9867 24.2306 33.6589C24.6936 31.3311 25.8365 29.1929 27.5147 27.5147C29.193 25.8365 31.3312 24.6936 33.6589 24.2306C35.9867 23.7676 38.3995 24.0052 40.5922 24.9134C42.7849 25.8217 44.6591 27.3598 45.9776 29.3332C47.2962 31.3065 48 33.6266 48 36C48 39.1826 46.7357 42.2348 44.4853 44.4853C42.2348 46.7357 39.1826 48 36 48Z"
      fill="white"
    />
    <path
      d="M42.9993 34.0934H38.2393C38.1509 34.0934 38.0662 34.0582 38.0036 33.9957C37.9411 33.9332 37.906 33.8484 37.906 33.76V29C37.9064 28.6577 37.7752 28.3282 37.5393 28.08C37.3035 27.8318 36.9813 27.6838 36.6393 27.6667H35.306C34.9641 27.6838 34.6418 27.8318 34.406 28.08C34.1702 28.3282 34.0389 28.6577 34.0393 29V33.76C34.0393 33.8484 34.0042 33.9332 33.9417 33.9957C33.8792 34.0582 33.7944 34.0934 33.706 34.0934H28.9993C28.657 34.0929 28.3276 34.2242 28.0793 34.46C27.8311 34.6958 27.6831 35.0181 27.666 35.36V36.6934C27.6831 37.0353 27.8311 37.3575 28.0793 37.5934C28.3276 37.8292 28.657 37.9604 28.9993 37.96H33.7593C33.8478 37.96 33.9325 37.9951 33.995 38.0576C34.0576 38.1202 34.0927 38.2049 34.0927 38.2934V43.0534C34.1088 43.3841 34.2475 43.6969 34.4816 43.9311C34.7158 44.1652 35.0286 44.3039 35.3593 44.32H36.6927C37.0234 44.3039 37.3363 44.1652 37.5704 43.9311C37.8045 43.6969 37.9432 43.3841 37.9593 43.0534V38.24C37.9593 38.1516 37.9945 38.0668 38.057 38.0043C38.1195 37.9418 38.2043 37.9067 38.2927 37.9067H43.0527C43.3834 37.8905 43.6963 37.7519 43.9304 37.5178C44.1645 37.2836 44.3032 36.9707 44.3193 36.64V35.3067C44.2895 34.9765 44.1378 34.6694 43.8937 34.445C43.6497 34.2207 43.3308 34.0953 42.9993 34.0934Z"
      fill="white"
    />
  </CustomSVG>
);

export default AddIcon;
