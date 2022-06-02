import React from "react";

import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom"

import DictList from "./DictList";
import Detail from "./Detail";
import AddDict from "./AddDict";

import styled from "styled-components";

import { createDict, readDictFB, createDictFB, updateDictFB } from "./redux/modules/dict";



function App() {

  const history = useHistory()
  const word = React.useRef(null);
  const mean = React.useRef(null);
  const example = React.useRef(null);
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(readDictFB())
  }, [])

  return (
    <div className="App">
      <Container>
        <Title onClick={() => {
          history.push("/");
        }} >내 사전</Title>
        <Line />
        <Route path="/" exact render={(props) => (
          <DictList />
        )}
        />
        <Route exact path="/detail/:index" component={Detail} />
        <Route exact path="/AddDict" component={AddDict} />
      </Container>
    </div>
  );
}


const Container = styled.div`
  max-width: 1500px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

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

export default App;