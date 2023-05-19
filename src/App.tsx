import Header from "./components/molecules/Header.tsx";
import styled from "styled-components";
import Input from "./components/atoms/Input.tsx";
import {lazy, Suspense} from "react";
import Loading from "./components/atoms/Loading.tsx";

const Container = styled.div`
  width: 55%;
  margin: 0 auto;
  padding: 40px 0;

  display: grid;
  grid-template-rows: 3.5rem 3.5rem  1fr;
  row-gap: 1rem;

  @media (max-width: 992px) {
    width: 90%;
  }
`

const LazySimilarWords = lazy(() => import('./components/molecules/SimilarWords.tsx'));
const LazyInfoWords = lazy(() => import('./components/molecules/InfoWord.tsx'));

function App() {
    return (
                <Container>
                    <Header/>
                    <Input/>
                    <Suspense fallback={<Loading/>}>
                        <LazySimilarWords/>
                    </Suspense>
                    <Suspense fallback={<Loading/>}>
                        <LazyInfoWords/>
                    </Suspense>
                </Container>
    )
}

export default App
