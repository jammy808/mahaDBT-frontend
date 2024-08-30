import React from "react";
import styled from "styled-components";

import { GlobalStyle } from '../../PageStyle/globalStyles';

const Rb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  position: relative;
  /* z-index: 10; */
  svg {
    width: 100%;
    height: auto;
  }
  @media only Screen and (max-width: 48em) {
    display: none;
  }
`;

const SvgBlock = ({ svg }) => {
  const SvgIcon = require(`../../Assets/${svg}`);
  //console.log(SvgIcon);
  return (
    <Rb id="svgBlock">
      <img src={SvgIcon} alt="Services" />
    </Rb>
  );
};

export default SvgBlock;
