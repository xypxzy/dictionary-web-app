import styled from "styled-components";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import {useEffect} from "react";
import {changeTheme} from "../../features/themeSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";

const Container = styled.div`
`;
const ToggleButton = styled.span`
  display: flex;
  align-items: center;
  gap: 15px;
  
  input[type=checkbox] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 40px;
    height: 20px;
    background: var(--dark-gray);
    display: block;
    border-radius: 20px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 10px;
    transition: 0.3s;
  }

  input:checked + label {
    background: var(--gray);
  }
  
  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 10px;
  }

`;
const ThemeIcon = styled.span`
  font-size: 25px;
`



function ThemeToggle() {
    // const [isDark, setIsDark] = useState<themeType>('dark')
    const theme = useSelector((state: RootState) => state.theme.currentTheme);
    const dispatch: AppDispatch = useDispatch();

    useEffect(()=> {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    const handleSetTheme = () => {
        dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'))
    }

    return (
        <Container>
            <ToggleButton >
                <input type="checkbox" id="switch" onClick={handleSetTheme}/>
                <label htmlFor="switch">Toggle</label>
                <ThemeIcon>
                    {theme == 'light' ? <RiSunLine /> : <RiMoonLine />}
                </ThemeIcon>
            </ToggleButton>
        </Container>
    );
}

export default ThemeToggle;