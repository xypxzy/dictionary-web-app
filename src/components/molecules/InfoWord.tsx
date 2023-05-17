import styled from "styled-components";
import Word from "../atoms/Word.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import {IWords} from "../../types/words.types.ts";

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;

`;


function InfoWord() {
    const {data, status} = useSelector((state: RootState) => state.words);


    const filterHomographs = (data: IWords[]): IWords[] => {
        return data.filter((word : IWords) => word.hom || word.meta.uuid == data[0].meta.uuid)
    }
    const filterSynonyms = (data: IWords[]): IWords[] => {
        return data.filter((word : IWords) => !(word.hom || word.meta.uuid == data[0].meta.uuid))
    }

    return (
        <>
            {
                status == 'loading'
                    ?
                        <>isLoad</>
                    :
                <Wrapper>
                    <Word/>
                    <strong>Meaning</strong> <br/>
                    {filterHomographs(data).map(word => (
                        <div key={word.meta.uuid}>
                            <h5>{word.fl}</h5>
                            <div>
                                {word.shortdef.map((sh, i) => <li key={i}>{sh}</li>)}
                                {filterSynonyms(data).filter(syn => syn.fl == word.fl).length > 0 && <strong>Synonyms</strong>}
                                {filterSynonyms(data)
                                    .filter(syn => syn.fl == word.fl)
                                    .map(word => (
                                        <span key={word.meta.uuid}>
                                    {word.hwi.hw}
                                </span>))}
                            </div>
                        </div>
                    ))}
                </Wrapper>
            }
        </>
    );
}

export default InfoWord;