import styled from "styled-components";
import { RiSearchLine } from "react-icons/ri";
import {useDispatch} from "react-redux";
import {ChangeEvent, FormEvent, useState} from "react";
import {getWords} from "../../features/wordsSlice.ts";
import {AppDispatch} from "../../store.ts";

const FormContainer = styled.form`
  width: 95%; 
  margin: 0 auto;
  
  display: flex;
  justify-content: space-between;
  
`

const InputContainer = styled.input `
  width: 100%;
  padding: 15px 20px;
  background:  var(--light-gray);
  
  border: none;
  border-radius: 8px 0 0 8px;

  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
`;

const InputButton = styled.button`
  padding: 15px 20px;
  background: var(--light-gray);
  
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  
  color: var(--purple);
  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
`;

function Input() {
    const [inputValue, setInputValue] = useState<string>('');
    const dispatch:AppDispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(getWords(inputValue))
        setInputValue('')
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <InputContainer type='text' value={inputValue} onChange={handleChange}/>
            <InputButton type='submit'>
                <RiSearchLine />
            </InputButton>
        </FormContainer>
    );
}

export default Input;