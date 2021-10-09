import * as Styled from './styled';

const Button = ({ text, onClick }: { text: string; onClick: fn }) => (
  <Styled.Button onClick={onClick}>
    <span>{text}</span>
  </Styled.Button>
);

export default Button;
