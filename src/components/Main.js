import React, { useState } from 'react';
import styled from 'styled-components';
import PostList from './PostList';
import PostDetail from './PostDetail';

const MainWrapper = styled.div`
  display: flex;
`;

export default function Main({ posts }) {
  const [selectedId, serSelectedId] = useState(null);
  const selectedPost = selectedId && posts.find(item => item.id === selectedId);

  return (
    <MainWrapper>
      <PostList
        posts={posts}
        onDismiss={console.log}
        onSelect={post => { serSelectedId(post.id); }}
      />
      <PostDetail post={selectedPost} />
    </MainWrapper>
  );
}