import styled from 'styled-components';

const StyledFooter = styled.footer`
  width: 100%;
  height: 50px;

  background: linear-gradient(132.33deg, #d24074 -0.67%, #6518b4 102.54%);

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;

  font-family: Space Grotesk;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  color: white;

  a {
    color: white;
  }

  span {
    cursor: pointer;
  }
`;

const Footer = ({ disconnect }: { disconnect?: () => void }) => {
  return (
    <StyledFooter>
      <span>
        Made by{' '}
        <a href="https://twitter.com/dannyaziz97" target="__blank">
          Danny Aziz
        </a>
      </span>
      {disconnect && <span onClick={disconnect}>Disconnect Wallet</span>}
      {!disconnect && <div />}
      <span>
        <a
          href="https://github.com/DannyAziz/imfeelingluckynfts"
          target="__blank"
        >
          GitHub
        </a>
      </span>
    </StyledFooter>
  );
};

export default Footer;
