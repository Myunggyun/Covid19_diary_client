import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Contentpage from "../Content/Content";

const Content = styled.div`
  background: #ffac9a;
  border-style: solid 3px;
`;

const ContentsListView = () => {
  const [contentList, setContentList] = useState(null);
  const getToken = window.sessionStorage.getItem("token");

  useEffect(() => {
    const ac = new AbortController();
    axios
      .get("http://localhost:5000/contentList", {
        headers: { "x-access-token": getToken },
      })
      .then(res => {
        setContentList([...res.data.contentList]);
      });
    return () => {
      ac.abort();
    };
  }, []);
  // console.log(contentList);

  return (
    <center className="ContentsList">
      <div className="SerchInput">
        <input type="text" placeholder="검색어를 입력하시오"></input>
      </div>
      <div className="ContentListBox">
        {contentList?.map(data => (
          <Content key={data.id}>
            <Link to={`/content/${data.id}`}>
              <h1>{data.title}</h1>
              <span>{data.createdAt}</span>
              <p>{data.text}</p>
            </Link>
          </Content>
        ))}
      </div>
    </center>
  );
};

export default ContentsListView;
