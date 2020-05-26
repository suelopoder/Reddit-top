import React, { useState } from 'react';
import styled from 'styled-components';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost, markPostAsSeen } from '../actions';
import { selectActivePost, redditPostsSelector } from '../selectors';

const MainWrapper = styled.div``;

export default function Main({ loadingData, onLoadMore }) {
  const posts = useSelector(redditPostsSelector);
  const [dismissed, setDismissed] = useState([]);
  const [menuExpanded, setMenuExpanded] = useState(true);
  const dispatch = useDispatch();
  const activeId = useSelector(selectActivePost);
  const activePost = activeId && posts.find(item => item.id === activeId);
  const shownPosts = posts.filter(post => dismissed.indexOf(post.id) === -1);

  return (
    <MainWrapper>
      <PostList
        posts={shownPosts}
        onDismiss={post => {
          if (post.id === activeId) {
            dispatch(selectPost(null));
          }
          setDismissed([...dismissed, post.id])
        }}
        onSelect={post => {
          dispatch(markPostAsSeen(post.id));
          dispatch(selectPost(post.id));
          setMenuExpanded(false)
        }}
        expanded={menuExpanded}
        onExpandToogle={() => setMenuExpanded(!menuExpanded)}
        onLoadMore={onLoadMore}
        loadingMore={loadingData}
      />
      <PostDetail post={activePost} />
    </MainWrapper>
  );
}