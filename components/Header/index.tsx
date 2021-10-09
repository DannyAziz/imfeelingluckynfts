import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100%;
  height: 50px;

  background: linear-gradient(132.33deg, #d24074 -0.67%, #6518b4 102.54%);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: Space Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: center;

  color: #ffffff;
`;

const Header = () => (
  <StyledHeader>
    <Title>NFT: I&apos;m Feeling Lucky</Title>
  </StyledHeader>
);

export default Header;
