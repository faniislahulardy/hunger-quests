import styled from 'styled-components';

const Button = styled.button`
  font-size: 1.2rem;
  display: block;
  border-width: 0px;
  padding: 10px 20px;
  position: relative;
  border-radius: 10px;
  font-style: 20px;
  font-weight: bold;
  text-align: center;
  background: ${({ disabled }) => (disabled ? '#5b7cc3' : '#477ced')};
  opacity: ${({ disabled }) => (disabled ? '.7' : '1')};
  box-shadow: 0px 5px 0px #285097;
  display: block;
  color: #fff;
  text-decoration: none;

  &:hover {
    top: 3px;
    box-shadow: 0px 2px 0px #285097;
  }
`;

export default Button;
