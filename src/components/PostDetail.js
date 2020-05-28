import React from 'react';
import styled from 'styled-components';
import { MOBILE_MAX_SIZE, EXPANDED_PANEL_SIZE, COLLAPSED_PANEL_SIZE } from '../constants';

const PostDetailWrapper = styled.main`
  flex: 2;
  margin: 1rem;
  div { text-align: center; }
  position: relative;
  margin-left: ${EXPANDED_PANEL_SIZE};
  @media (max-width: ${MOBILE_MAX_SIZE}) {
    margin-left: ${COLLAPSED_PANEL_SIZE};
  }
`;

export default function PostDetail({ post }) {
  if (!post) return <PostDetailWrapper />;

  const { author, title, imgUrl } = post;
  return (
    <PostDetailWrapper>
      <h1>{author}</h1>
      {imgUrl && (
        <div>
          <img src={imgUrl} alt={title} />
        </div>
      )}
      <p>{title}</p>
    </PostDetailWrapper>
  )
}