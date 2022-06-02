import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";


const DictList = (props) => {
    let history = useHistory();
    // console.log(props);
    // const my_lists = props.list;
    const my_lists = useSelector((state) => state.dict.list)
    // console.log(my_lists)
    return (
        <>
            <ListStyle>
                {my_lists.map((list, index) => {
                    return (
                        <ItemStyle
                            completed={list.completed}
                            className="list_item"
                            key={index}
                            onClick={() => {
                                history.push("/detail/" + index);
                            }}>
                            <div>단어 : {list.word}</div>
                            <div>뜻 : {list.mean}</div>
                            <div>예 : {list.example}</div>
                        </ItemStyle>
                    );
                })}
            </ListStyle>
            <Link to="/AddDict">
                <ADDBUTTON>+</ADDBUTTON>
            </Link>

        </>

    );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: auto;
  flex-wrap: wrap;
  gap: 60px;
  grid-column: px;
`;

const ItemStyle = styled.div`
  padding: 16px;
  width: 250px;
  height: 100px;
  background-color: ${(props) => props.completed ? "orange" : "aliceblue"};
`;

const ADDBUTTON = styled.button`
    position: fixed;
    bottom: 5%;
    right: 5%;
    width: 50px;
    height: 50px;
    border-radius: 50px;
`

export default DictList;