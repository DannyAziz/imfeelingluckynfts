import styled from 'styled-components';

export const PriceInput = styled.div`
  margin-top: 50px;

  display: grid;
  grid-gap: 100px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

export const PriceInputButton = styled.span`
  font-family: Space Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #838383;

  cursor: pointer;

  transition: all 0.3s ease-in-out;

  :hover {
    color: #000000;
  }
`;
