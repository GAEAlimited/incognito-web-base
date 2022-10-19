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

const MarketMoneyIcon = () => (
  <CustomSVG viewBox="0 0 72 72" fill="none">
    <circle cx={32} cy={32} r={32} fill="#252525" />
    <path
      d="M29.2793 27.1037L29.2793 43.2457C29.2793 43.66 29.1149 44.0573 28.8223 44.3502C28.5297 44.6432 28.1328 44.8078 27.7189 44.8078C27.3051 44.8078 26.9082 44.6432 26.6156 44.3502C26.323 44.0573 26.1586 43.66 26.1586 43.2457L26.1586 27.1037C26.1547 27.0694 26.1441 27.0363 26.1273 27.0061C26.1105 26.976 26.0879 26.9495 26.0608 26.9282C26.0337 26.9068 26.0027 26.8911 25.9694 26.8819C25.9362 26.8727 25.9015 26.8703 25.8673 26.8746L22.7466 26.8746C22.4707 26.8746 22.2061 26.7649 22.011 26.5696C21.816 26.3743 21.7064 26.1094 21.7064 25.8332C21.7069 25.6954 21.7348 25.5591 21.7884 25.4322C21.8419 25.3053 21.9201 25.1902 22.0184 25.0938L27.7894 19.308C27.8861 19.2104 28.0011 19.133 28.1279 19.0801C28.2547 19.0272 28.3484 19 28.528 19C28.7075 19 28.7797 19.0218 28.928 19.0801C29.0019 19.1091 29.2788 19.308 29.2788 19.6329C29.2788 19.9253 29.2793 20.3532 29.2793 21.0578L29.2793 21.3078L29.2793 27.1037Z"
      fill="url(#paint0_linear_8002_42972)"
    />
    <path
      d="M33.6348 36.8963L33.6348 20.7543C33.6348 20.34 33.7992 19.9427 34.0918 19.6498C34.3844 19.3568 34.7813 19.1922 35.1951 19.1922C35.609 19.1922 36.0058 19.3568 36.2985 19.6498C36.5911 19.9427 36.7555 20.34 36.7555 20.7543L36.7555 36.8963C36.7593 36.9306 36.77 36.9637 36.7868 36.9939C36.8035 37.024 36.8261 37.0505 36.8532 37.0718C36.8803 37.0932 36.9114 37.1089 36.9446 37.1181C36.9778 37.1273 37.0126 37.1297 37.0468 37.1254L40.1675 37.1254C40.4434 37.1254 40.7079 37.2351 40.903 37.4304C41.0981 37.6257 41.2077 37.8906 41.2077 38.1668C41.2071 38.3046 41.1793 38.4409 41.1257 38.5678C41.0721 38.6947 40.9939 38.8098 40.8956 38.9062L35.1247 44.692C35.028 44.7896 34.9129 44.867 34.7862 44.9199C34.6594 44.9728 34.5657 45 34.3861 45C34.2065 45 34.1343 44.9782 33.986 44.9199C33.9121 44.8909 33.6353 44.692 33.6353 44.3671C33.6353 44.0747 33.6348 43.6468 33.6348 42.9422L33.6348 42.6922L33.6348 36.8963Z"
      fill="url(#paint1_linear_8002_42972)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_8002_42972"
        x1={27.5}
        y1={43.5}
        x2={38.5624}
        y2={36.7109}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C0C0C0" />
        <stop offset={1} stopColor="#F5F5F5" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_8002_42972"
        x1={37.4212}
        y1={44.4838}
        x2={37.4212}
        y2={18.6761}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1C55B8" />
        <stop offset={1} stopColor="#1A73E8" />
      </linearGradient>
    </defs>
  </CustomSVG>
);

export default MarketMoneyIcon;