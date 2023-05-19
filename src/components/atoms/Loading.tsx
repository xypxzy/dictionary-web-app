import loadIcon from "../../assets/loading.svg";
import styled from "styled-components";
const Loading = styled.div`
  margin: 0 auto;
`

function IsLoading() {
    return (
        <Loading>
            <img src={loadIcon} alt=""/>
        </Loading>
    );
}

export default IsLoading;