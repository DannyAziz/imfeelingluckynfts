import * as Styled from './styled';

const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '<'];

const PriceInput = ({
  value,
  onChange,
}: {
  value: string | number;
  onChange: (newValue: string | number) => void;
}) => {
  const onInput = (input: string): void => {
    let newValue: any = '';
    const currentValue = value.toString();
    console.log(input, currentValue);
    if (input === '<') {
      if (value === 0) {
        return;
      }
      newValue = currentValue.slice(0, -1);
      newValue = parseFloat(newValue);
    } else if (input === '.') {
      newValue = currentValue + '.';
    } else {
      newValue = currentValue + input;
      newValue = parseFloat(newValue);
    }

    if (newValue.length === 0) {
      newValue = 0;
    }

    onChange(newValue);
  };

  return (
    <Styled.PriceInput>
      {values.map((value) => {
        const onClick = () => onInput(value);
        return (
          <Styled.PriceInputButton onClick={onClick} key={value}>
            {value}
          </Styled.PriceInputButton>
        );
      })}
    </Styled.PriceInput>
  );
};

export default PriceInput;
