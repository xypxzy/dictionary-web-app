import DropdownMenu from "../atoms/DropdownMenu.tsx";
import ThemeToggle from "../atoms/ThemeToggle.tsx";
import styled from "styled-components";
import {RiBook2Line} from 'react-icons/ri';

const Wrapper = styled.header `
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
`

const Logo = styled.div`
  font-family: inherit;
  font-size: 40px;
  font-weight: 200;
  color: var(--dark-gray);
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`

function Header() {
    return (
        <Wrapper>
            <Logo>
                <RiBook2Line/>
            </Logo>
            <Menu>
                <DropdownMenu/>
                <ThemeToggle/>
            </Menu>
        </Wrapper>
    );
}

export default Header;