import React from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deleteDict, deleteDictFB, updateDict, updateDictFB } from "./redux/modules/dict";
import { useHistory } from "react-router-dom"

import Button from '@mui/material/Button';



const Detail = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const dict_index = params.index
  const dict_list = useSelector((state) => state.dict.list)

  return (
    <div>
      <div>
        <span>단어 :</span>
        <h1>{dict_list[dict_index] ? dict_list[dict_index].word : ""}</h1>
      </div>
      <div>
        <span>뜻 :</span>
        <h1>{dict_list[dict_index] ? dict_list[dict_index].mean : ""}</h1>
      </div>
      <div>
        <span>예 :</span>
        <h1>{dict_list[dict_index] ? dict_list[dict_index].example : ""}</h1>
      </div>

      <Button variant="outlined" onClick={() => {
        // dispatch(updateDict(dict_index))
        dispatch(updateDictFB(dict_list[dict_index].id))
        history.goBack();
      }}>완료</Button>

      <Button variant="outlined" color="error" onClick={() => {
        // dispatch(deleteDict(dict_index))
        dispatch(deleteDictFB(dict_list[dict_index].id))
        history.goBack();
      }}>삭제</Button>
    </div>
  )
};

export default Detail;