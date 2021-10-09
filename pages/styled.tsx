import styled from 'styled-components';

export const Text = styled.p`
  font-family: Space Grotesk;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;

  color: #000000;
`;

export const Emphasis = styled.p`
  font-family: Space Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;

  color: #000000;
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PriceValue = styled.p`
  font-family: Space Grotesk;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 65px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 0.1em;

  color: #000000;

  margin-top: 3rem;
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  font-family: Space Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
`;

export const Link = styled.a`
  font-family: Space Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;

  color: #000000;
`;

export const Img = styled.img`
  border-radius: 16px;
`;
