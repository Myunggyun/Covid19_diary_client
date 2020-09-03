import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import "../../style.css"
import axios from "axios";
import getLogin from "../../Context/Context";

const ContentBox = styled.div`
  background: #F0CDCD;
`;

const CommentBox = styled.div`
  background: #ABE8E1;
`;

const CommentLi = styled.li`
  background: #F7FFAF;
`;

const ContentView = () => {

  const value = useContext(getLogin);
  // console.log('토큰 유무: ", value.token);

  let splitUrl = window.location.href.split('/')
  let contentId = splitUrl[4];

  const [content, setContent] = useState([]);
  const [comment, newComment] = useState('');
  const [commented, setCommneted] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    axios.get(`http://localhost:5000/content/${contentId}`,
      {
        headers:
          { "x-access-token": value.token }
      })
      .then(res => {
        // console.log(res);
        setContent(res.data.contentDetail);
      });
  }, [commented]);
  // console.log('content', content.comment);
  // console.log('새로운 댓글', comment);
  // console.log('누적 댓글', commented);
  const allComment = content.comment;

  const postComment = (e) => {
    console.log('postComment')
    e.preventDefault();
    //실제로 여기로 넣어준걸 렌더링하진 않지만, 변화이용해 리랜더링용임
    setCommneted([comment, ...content.comment,]);
    axios.post("http://localhost:5000/comment",
      {
        contentId: contentId,
        comment: comment
      },
      { headers: { "x-access-token": value.token } }
    )
      .then(res => {
        console.log(res);
      })
  }

  return (
    <center className="ContentViewBox">
      <ContentBox>
        <div className="Content">
          <h1>{content.title}</h1>
          <div className="TextArea">{content.text}</div>
          <br />
          <div>태그목록</div>
          <button>좋아요</button>
        </div>
      </ContentBox>

      <CommentBox>
        <div className="Comment">
          <input type="text" placeholder="댓글을 작성하세요" onChange={(e) => newComment(e.target.value)} />
          <button onClick={postComment}>댓글 작성</button>
          <div>
            {allComment?.map(data => (
              <CommentLi>
                {data.user.nickName}
                <br />
                {data.createdAt}
                <br />
                {data.comment}
              </CommentLi>
            ))}
          </div>
        </div>
      </CommentBox>
    </center>
  )
}

export default ContentView;