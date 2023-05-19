import styled from "styled-components";
import Word from "../atoms/Word.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";
import {IWords} from "../../types/words.types.ts";
import React, { useState} from "react";
import {getWords} from "../../features/wordsSlice.ts";
import {Item, List} from "../atoms/Badges.tsx";
import {searchFormatter} from "../../helpers/helpers.ts";
import IsLoading from "../atoms/Loading.tsx";


const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const FunctionalLabel = styled.h5`
  margin: 15px 0;
  font-size: 18px;

  display: flex;
  flex-direction: row;

  &:after {
    content: "";
    flex: 1 1;
    border-bottom: 1px solid var(--light-gray);
    margin: auto;
  }

  &:after {
    margin-left: 10px
  }
`

const HeadwordInfo = styled.div`
  
`
const ShortDef = styled.ul`
  margin: 0;
  padding: 0;
`
const ShortDefItem = styled.li`
  margin: .5rem 3rem;
  padding: .5rem 1rem;
`

const SynonymsItems = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`

const Tag = styled.h3 `
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  
  margin: 0;
  padding: 0;
  
  color: var(--dark-gray);
  
`


function InfoWord() {
    const {words, status} = useSelector((state: RootState) => state.words);
    const [curValue, setCurValue] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();


    const filterHomographs = (data: IWords[]): IWords[] => {
        return words.filter((word: IWords) => word.hom || word.meta.uuid == data[0].meta.uuid)
    }
    const filterSynonyms = (data: IWords[]): IWords[] => {
        return words.filter((word: IWords) => !(word.hom || word.meta.uuid == data[0].meta.uuid))
    }
    const handleChooseWord = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurValue(e.currentTarget.innerHTML);
        dispatch(getWords(curValue));

    }

    return (
        <>
            {
                status == 'loading'
                    ?
                    <IsLoading/>
                    :
                    <Wrapper>
                        <Word/>
                        {filterHomographs(words).map(word => (
                            <div key={word.meta.uuid}>
                                <FunctionalLabel>{word.fl}</FunctionalLabel>
                                <HeadwordInfo>
                                    <ShortDef>
                                        {word.shortdef.length > 0 && <Tag>Meaning</Tag>}
                                        {word.shortdef.map((sh, i) => (
                                            <ShortDefItem key={i}>
                                                {sh}
                                            </ShortDefItem>
                                        ))}
                                    </ShortDef>
                                    <SynonymsItems>
                                        {filterSynonyms(words).filter(syn => syn.fl == word.fl).length > 0 &&
                                            <Tag>Synonyms:</Tag>}
                                        {<List>
                                            {filterSynonyms(words)
                                                .filter(syn => syn.fl == word.fl)
                                                .map(word => (
                                                    <Item key={word.meta.uuid} onClick={handleChooseWord}>
                                                        {searchFormatter(word)}
                                                    </Item>))}
                                        </List>}
                                    </SynonymsItems>
                                </HeadwordInfo>
                            </div>
                        ))}
                    </Wrapper>
            }
        </>
    );
}

export default InfoWord;