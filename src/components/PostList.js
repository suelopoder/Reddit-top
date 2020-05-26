import React from 'react';
import styled from 'styled-components';
import PostListItem from './PostListItem';
import { SPACING } from '../constants';

const PostListElement = styled.ul`
  padding: 0;
  margin: 0;
  flex: 1;
`

const PostListContainer = styled.nav`
  background: black;
  > h2 {
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