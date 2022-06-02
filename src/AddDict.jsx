import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { createDict, readDictFB, createDictFB, updateDictFB } from "./redux/modules/dict";

import styled from "styled-components";

import Button from '@mui/material/Button';

const AddDict = () => {
    const history = useHistory();
    const dispatch = useDispatch()

    const word = React.useRef(null);
    const mean = React.useRef(null);
    const example = React.useRef(null);

    React.useEffect(() => {
        dispatch(readDictFB())

    }, [])

    const addDictList = () => {
        dispatch(createDictFB({
            word: word.current.value,
            mean: mean.current.value,
            example: example.current.value,
            completed: false
        }))
        history.push("/");
        // window.location.replace("/")
    }

    return (
        <Input>
            <div>
                <span>단어 :</span>
                <input type="text" ref={word} />
            </div>
            <div>
                <span>뜻 :</span>
                <input type="text" ref={mean} />
            </div>
            <div>
                <span>예 :</span>
                <input type="text" ref={example} />
            </div>
            <div>
                <Button variant="outlined" onClick={addDictList}>추가하기</Button>
            </div>
        </Input>
    )
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  

  & input{
    border: 1px solid #888;
    width: 70%;
    margin: 10px
  }
`;

export default AddDict