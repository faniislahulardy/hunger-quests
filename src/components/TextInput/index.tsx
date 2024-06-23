import styled from 'styled-components';

interface Props extends React.HTMLProps<HTMLInputElement> {
  'data-valid': boolean;
}

const TextInput = styled.input<Props>`
  width: 100%;
  border-width: 0px;
  border-radius: 0px;
  border-bottom-width: 3px;
  height: 3rem;
  font-size: 2.4rem;
  text-align: center;

  &:focus {
    border-color: ${props => (props['data-valid'] ? '#0090e3' : 'red')};
    outline: none;
  }
`;

export default TextInput;
