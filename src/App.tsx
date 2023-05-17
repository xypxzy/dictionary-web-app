import Header from "./components/molecules/Header.tsx";
import styled from "styled-components";
import Input from "./components/atoms/Input.tsx";
import InfoWord from "./components/molecules/InfoWord.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./store.ts";
import NotFound from "./pages/NotFound.tsx";

const Container = styled.div`
  width: 55%;
  margin: 0 auto;
  padding: 40px 0;

  display: grid;
  grid-template-rows: 3.5rem 3.5rem 1fr;
  row-gap:1rem;
`

function App() {
    const {data} = useSelector((state: RootState) => state.words);
    return (
        <>
            {typeof data[0] == 'string'
                ?
                <NotFound/>
                :
                <Container>
                    <Header/>
                    <Input/>
                    <InfoWord></InfoWord>
                </Container>
            }

        </>

    )
}

export default App
