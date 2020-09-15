import React, { Fragment } from "react";
import styled from "styled-components";
import Nav from "../component/Nav/Nav";
import ContentView from "../component/Content/Content";

const BREAK_POINT_MOBILE = 580;
const BREAK_POINT_TABLET = 1024;

const Container = styled.article`
  display: block;
  /* background: #ffffff; */
  margin-left: 20%;
  margin-right: 20%;
  position: relative;
  font-family: "S-CoreDream-3Light";
  font-weight: normal;
  font-style: normal;
  line-height: 180%;

  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    margin-left: 0px;
    margin-right: 0px;
    width: 100%;
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    margin-left: 0px;
    margin-right: 0px;
    width: 100%;
  }
`;

function Content() {
  return (
    <Fragment>
      <Container>
        <Nav />
        <ContentView />
      </Container>
    </Fragment>
  );
}

export default Content;
