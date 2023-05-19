import styled from "styled-components";

interface ButtonProps {
    fontSize?: string;
}

export const List = styled.span `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px 30px;
`

export const Item = styled.button<ButtonProps>`
  border: none;
  background-color: var(--bg);
  color: var(--purple);
  
  font-family: inherit;
  font-size: ${props => props.fontSize || '16px'};
  font-weight: 700;
  text-align: start;
  cursor: pointer;
  
  &:hover {
    color: var(--light-purple);
  }
`

