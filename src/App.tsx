import Header from "./components/molecules/Header.tsx";
import styled from "styled-components";
import Input from "./components/atoms/Input.tsx";

const Container = styled.div `
  width: 55%;
  margin: 0 auto;
  padding: 40px 0;
`

function App() {


  return (
    <Container>
      <Header />
      <Input />
    </Container>
  )
}

export default App
