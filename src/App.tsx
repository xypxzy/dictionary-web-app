import {changeTheme} from "./features/themeSlice.ts";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store.ts";
import {getWords} from "./features/wordsSlice.ts";
import {changeFonts} from "./features/fontsSlice.ts";
import DropdownMenu from "./components/atoms/DropdownMenu.tsx";

function App() {
  const theme = useSelector((state: RootState) => state.theme.currentTheme);
  const font = useSelector((state: RootState) => state.fonts.font);
  const dispatch: AppDispatch = useDispatch();

  const {data, error, status} = useSelector((state: RootState) => state.words)

  useEffect(()=> {
    document.body.setAttribute('data-theme', theme)
  }, [theme])
  useEffect(() => {
    document.body.setAttribute('font', font)
  })
  useEffect(() => {
    dispatch(getWords('test'));
  }, [dispatch])

  const handleSetTheme = () => {
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'))
  }
  const handleSetFonts = () => {
    dispatch(changeFonts(font == 'sans' ? 'serif': 'sans'))
  }

  return (
    <>
      <button onClick={handleSetTheme}>Change Theme</button>
      <button onClick={handleSetFonts}>Change Fonts</button>
      <div>
        <h1>{data[0]?.hwi.hw}</h1>
        <p>{data[0]?.shortdef}</p>
      </div>

      <DropdownMenu />
    </>
  )
}

export default App
