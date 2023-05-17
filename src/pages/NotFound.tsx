import styled from "styled-components";

const Wrapper = styled.div `
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 50px;
`

function NotFound() {
    return (
        <Wrapper>
            Not Found
        </Wrapper>
    );
}

export default NotFound;