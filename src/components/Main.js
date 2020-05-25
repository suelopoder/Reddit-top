import React from 'react';
import styled from 'styled-components';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from '../actions';
import { selectActivePost } from '../selectors';

const MainWrapper = styled.div`
  > *:nth-child(1) {
    position: fixed;
    width: 350px;
    overflow-y: scroll;
    top: 0;
    bottom: 0;
  }
  > *:nth-child(2) {
    position: relative;
    margin-left: 350px;
  }
`;

export default function Main({ posts }) {
  const dispatch = useDispatch();
  const activeId = useSelector(selectActivePost);
  const activePost = activeId && posts.find(item => item.id === activeId);

  return (
    <MainWrapper>
      <PostList
        posts={posts}
        onDismiss={console.log}
        onSelect={post => { dispatch(selectPost(post.id)); }}
      />;
      <PostDetail post={activePost} />
    </MainWrapper>
  );
}