import React from 'react';
import styled from 'styled-components';
import PostListItem from './PostListItem';
import { SPACING } from '../constants';

const PostListElement = styled.ul`
  padding: 0;
  margin: 60px 0 0 0;
  flex: 1;
`

const PostListContainer = styled.nav`
  background: black;
  position: fixed;
  width: 350px;
  overflow-y: scroll;
  top: 0;
  bottom: 0;
  > h2 {
    position: fixed;
    box-sizing: border-box;
    width: 350px;
    color: white;
    text-align: center;
    background-color: #212121;
    margin: 0;
    padding: ${SPACING.MEDIUM};
  }
`

export default function PostList({ posts, onDismiss, onSelect }) {
  return (
    <PostListContainer>
      <h2>Reddit Posts</h2>
      <PostListElement>
        {posts.map(post =>
          <PostListItem
            {...post}
            key={post.id}
            onSelect={() => onSelect(post)}
            onDismiss={() => onDismiss(post)}
          />
        )}
      </PostListElement>
    </PostListContainer>
  )
}