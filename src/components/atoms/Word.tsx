import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import styled from "styled-components";
import {RiPlayFill} from 'react-icons/ri'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`

const WordInfo = styled.span`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  
  & h1 {
    margin:  0;
    font-size: 46px;
    text-transform: capitalize;
  }
  
  & h4 {
    margin: 0;
    font-weight: 400;
    color: var(--purple);
  }
`

const PlayButton = styled.button`
  padding: 15px 15px 10px;
  
  background-color: var(--light-purple);
  color: var(--purple);
  font-size: 30px;
  
  border: none;
  border-radius: 50%;
  
  cursor: pointer;
`
function Word() {
    const {data, error} = useSelector((state: RootState) => state.words);
    return (
        <>
            {data.length
                ? <Wrapper>
                <WordInfo>
                    <h1>{
                        data[0].hwi.hw.includes('*') ?
                            data[0].hwi.hw.split('').filter(ch => ch !== '*').join('') :
                            data[0].hwi.hw
                    }</h1>
                    <h4>{data[0].hwi.prs && <>/{data[0].hwi.prs[0].mw}/</>}</h4>
                </WordInfo>
                <PlayButton>
                    <RiPlayFill />
                </PlayButton>
            </Wrapper>
                : <>{error}</>
            }

        </>
    )
}

export default Word;