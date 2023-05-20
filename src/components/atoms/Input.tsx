import styled from "styled-components";
import {RiSearchLine} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {getWords, setCurrentWord} from "../../features/wordsSlice.ts";
import {AppDispatch, RootState} from "../../store.ts";

interface IFormContainer {
    error: boolean
}

const FormContainer = styled.form<IFormContainer>`
  width: 95%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  
  border: 1px solid ${props => props.error ? 'red' : 'gray'};
  border-radius: 8px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const InputContainer = styled.input`
  width: 100%;
  padding: 15px 20px;
  background: var(--input-bg);

  border: none;
  border-radius: 8px 0 0 8px;
  color: inherit;

  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
`;

const InputButton = styled.button`
  padding: 15px 20px;
  background: var(--input-bg);

  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;

  color: var(--search);
  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
`;

function Input() {
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError ] = useState<boolean>(false);

    const currentWord = useSelector((state : RootState) => state.words.currentWord)

    const dispatch: AppDispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setError(false);
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if([...(new Set([...inputValue]))].join('') === ' ' || inputValue === '' || !inputValue.trim().match(/^[a-zA-Z0-9$@!%*?&#^-_. +]+$/)) {
            setError(true);
            return;
        }
        dispatch(setCurrentWord(inputValue))
        setInputValue('')
    }

    useEffect(() => {
        dispatch(getWords(currentWord))
        dispatch(setCurrentWord(''))
    }, [currentWord])

    return (
        <>
            <FormContainer onSubmit={handleSubmit} error={error}>
                <InputContainer
                    type='text'
                    name="word"
                    aria-label='Search'
                    value={inputValue}
                    onChange={handleChange}
                />
                <InputButton type='submit' id='searchBtn' aria-label='searchBtn'>
                    <RiSearchLine/>
                </InputButton>
            </FormContainer>
        </>
    );
}

export default Input;