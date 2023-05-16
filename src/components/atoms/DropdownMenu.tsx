import styled from "styled-components";

const Wrapper = styled.div `
    background: #000;
    color: #E9D0FA;
    width: 50px;
    display: inline-block;

  &:hover .DropDownContent{
    display: block;
  }
`
const DropButton = styled.button`
    background: yellow;
`
const DropDownContent = styled.div`
  display: none;
  
`
const DropDownItem = styled.button`
  display: block;
`

function DropdownMenu() {
    return (
        <Wrapper>
            <DropButton>Fonts</DropButton>
            <DropDownContent>
                <DropDownItem>Sans</DropDownItem>
                <DropDownItem>Serif</DropDownItem>
                <DropDownItem>Mono</DropDownItem>
            </DropDownContent>
        </Wrapper>
    );
}

export default DropdownMenu;