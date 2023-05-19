import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";
import styled from "styled-components";
import React, { useState} from "react";
import {getWords} from "../../features/wordsSlice.ts";
import {Item, List} from "../atoms/Badges.tsx";

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
`


function SimilarWords() {
    const [curValue, setCurValue] = useState<string>('');
    const {similarWords} = useSelector((state: RootState) => state.words);
    const dispatch: AppDispatch = useDispatch();

    const handleChooseWord = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurValue(e.currentTarget.innerHTML);
        dispatch(getWords(curValue));
    }
    return (

            <Wrapper>
                {similarWords.length > 0 && <>
                    <h3>Did you mean this: </h3>
                    <List>
                        {similarWords.map((word, i) => {
                            return (<Item key={i} onClick={handleChooseWord} fontSize='16px'>
                                {word}
                            </Item>)
                        })
                        }
                    </List>
                </>}
            </Wrapper>

    );
}

export default SimilarWords;