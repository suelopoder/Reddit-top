import React from 'react';
import styled from 'styled-components';

const PostDetailWrapper = styled.main`
  flex: 2;
  margin: 1rem;
  div { text-align: center; }
`;

export default function PostDetail({ post }) {
  if (!post) return <PostDetailWrapper />;

  const { author, title, imgUrl } = post;
  return (
    <PostDetailWrapper>
      <h1>{author}</h1>
      <div>
        <img src={imgUrl} alt={title} />
      </div>
      <p>{title}</p>
    </PostDetailWrapper>
  )
}