// This is HeroSection component, Main top section of website

import styled, { keyframes } from "styled-components";

import pinkBlob from "../../Assets/blobPink.png";
import purpleBlob from "../../Assets/blob purple.png";
import whiteBlob from "../../Assets/blob white.png";
import arrow from "../../Assets/Arrow Right.svg";
import Mobile from "../../Assets/mobile.svg";
import { useNavigate } from "react-router-dom";

import { GlobalStyle } from '../../PageStyle/globalStyles';

const move = keyframes`
    0% { transform: translateY(-5px)  }
    50% { transform: translateY(10px) }
    100% { transform: translateY(-5px) }
`;

const HomeSection = styled.section`
  width: 100vw;
  height: 45vw;
  background-color: #ECECEC;
  display: flex;
  justify-content: center;
  position: relative;
  @media only Screen and (max-width: 48em) {
    height: 70vw;
    display: block;
  }
  @media only Screen and (max-width: 420px) {
    height: auto;
    padding-bottom: 2rem;
  }
`;

const Blobs = styled.div`
  width: 100%;
  position: absolute;
  right: 0;
  @media only Screen and (max-width: 48em) {
    opacity: 0.5;
  }
`;

// const PinkBlob = styled.div`
//   width: calc(15% + 15vw);
//   position: absolute;
//   right: 0;
//   top: calc(5rem + 5vw);
//   z-index: 6;
// `;
const PurpleBlob = styled.div`
  width: calc(10% + 10vw);
  position: absolute;
  right: 0;
`;
const WhiteBlob = styled.div`
  width: calc(20% + 20vw);
  position: absolute;
  right: calc(3.5rem + 3.5vw);
  top: calc(2rem + 2vw);
  z-index: 5;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  @media only Screen and (max-width: 48em) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }
`;

const MobileSvg = styled.img`
  max-width: 100%;
  width: calc(30% + 20vw);
  height: auto;
  z-index: 7;
  animation: ${move} 2.5s ease infinite;
  @media only Screen and (max-width: 48em) {
    align-self: flex-start;
    position: absolute;
    bottom: 0;
    width: calc(30% + 20vw);
    opacity: 0.5;
  }
  @media only Screen and (max-width: 40em) {
    display: none;
  }
`;

const Lb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  line-height: 1.5;
  color: #000000;
  position: relative;
  z-index: 15;
  @media only Screen and (max-width: 48em) {
    width: 80%;
    text-align: center;
    align-items: center;
    justify-content: space-around;
    margin-top: calc(2.5rem + 2.5vw);
    filter: drop-shadow(2px 4px 6px black);
  }
  @media only Screen and (max-width: 40em) {
    filter: none;
  }
`;

const Topic = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(155deg, #4dbe9f, #008b69);
  color: #faf8ff;
  font-weight: 700;
  font-size: calc(0.4rem + 0.4vw);
  padding: 0.5rem 1rem;
  border-radius: 20px;
`;

const Circle = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-image: linear-gradient(155deg, #ff7b60, #b22da9);
  margin-right: 0.5rem;
`;

const Title = styled.h1`
  font-size: calc(2rem + 1vw);
  line-height: 1.2;
  padding: 0.5rem 0;
`;

const SubText = styled.h5`
  font-size: calc(0.75rem + 0.5vw);
  margin-top: 1rem;
`;

const CTA = styled.button`
  background-color: #faf8ff;
  border: 2px solid #003ebb;
  color: #003ebb;
  padding: 0.5rem 1rem;
  margin-top: 2rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: calc(0.5rem + 0.5vw);
  font-weight: 700;
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  img {
    width: 1.5rem;
  }
  @media only screen and (max-width: 48em) {
    padding: 0.2rem 1rem;
  }
  &:hover {
    transform: scale(1.1);
    background-image: linear-gradient(155deg, #003ebb, #002fa8);
    border: 0;
    color: #faf8ff;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
    <HomeSection id="home">
      <GlobalStyle/>
      <Blobs>
        {/* <PinkBlob>
          <img src={pinkBlob} alt="" width="400" height="400" />{" "}
        </PinkBlob> */}
        <WhiteBlob>
          <img src={whiteBlob} alt="" width="400" height="400" />
        </WhiteBlob>
        <PurpleBlob>
          <img src={purpleBlob} alt="" width="400" height="400" />
        </PurpleBlob>
      </Blobs>

      <MainContent id="home">
        <Lb id="leftBlock">
          <Topic>
            <Circle />
            <span>Scholarship Opportunities</span>
          </Topic>
          <Title>Prime Minister's Special Scholarship Scheme</Title>
          <SubText>
          "Seize the opportunity with the Prime Minister's Special Scholarship Scheme (PMSSS) and pave the way for a successful future."
          </SubText>
          <CTA onClick={() => navigate('/profile/dash')}>
            Apply Now &nbsp;
            <i className="material-icons">turn_right</i>

          </CTA>
        </Lb>

        <MobileSvg
          src={Mobile}
          alt="Mobile Svg"
          srcSet=""
          width="400"
          height="400"
        />
      </MainContent>
    </HomeSection>
    </>
  );
};

export default HeroSection;
