import {changeTheme} from "./features/theme/themeSlice.ts";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store.ts";

function App() {
  const theme = useSelector((state: RootState) => state.theme.currentTheme);
  const dispatch: AppDispatch = useDispatch();

  const words = useSelector((state: RootState) => state.words.data)

  useEffect(()=> {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const handleSetTheme = () => {
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <button onClick={handleSetTheme}>Change Theme</button>
      {words?.hw1}
    </>
  )
}

export default App
