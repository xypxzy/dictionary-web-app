import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";
import {changeFonts} from "../../features/fontsSlice.ts";
import {RiArrowDownSLine} from 'react-icons/ri'

const DropdownContainer = styled.div `
  position: relative;
  display: inline-block;
  
  background-color: var(--bg);
`
const DropButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  
  background-color: inherit;
  color: inherit;
  font-family: inherit;  
  font-size: inherit;
  text-transform: capitalize;
  
  padding: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  
`
const DropDownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: -10px;
  background-color: inherit;
  list-style-type: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`
const DropDownItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  
  &:hover {
    background-color: inherit;
  }

`

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const font = useSelector((state: RootState) => state.fonts.font);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.body.setAttribute('font', font)
    }, [font])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target  as Node)) {
            setIsOpen(false);
        }
    };

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropButton onClick={toggleDropdown}>{font} <RiArrowDownSLine/> </DropButton>
            {isOpen &&
                <DropDownMenu onClick={() => setIsOpen(false)}>
                    <DropDownItem onClick={() => dispatch(changeFonts('sans'))}>Sans</DropDownItem>
                    <DropDownItem onClick={() => dispatch(changeFonts('serif'))}>Serif</DropDownItem>
                    <DropDownItem onClick={() => dispatch(changeFonts('mono'))}>Mono</DropDownItem>
                </DropDownMenu>
            }
        </DropdownContainer>
    );
}

export default DropdownMenu;