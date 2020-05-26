import React from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import PostListItem from './PostListItem';
import { SPACING, EXPANDED_PANEL_SIZE, MOBILE_MAX_SIZE, COLLAPSED_PANEL_SIZE } from '../constants';
import Button from './Button';

const PostListElement = styled.ul`
  padding: 0;
  margin: 60px 0 0 0;
  flex: 1;
  @media (max-width: ${MOBILE_MAX_SIZE}) {
    display: ${props => props.expanded ? 'block' : 'none'}
  }
`

const PostListContainer = styled.nav`
  background: black;
  position: fixed;
  width: ${EXPANDED_PANEL_SIZE};
  overflow-y: scroll;
  top: 0;
  bottom: 0;
  > h2 {
    position: fixed;
    box-sizing: border-box;
    width: ${EXPANDED_PANEL_SIZE};
    color: white;
    text-align: center;
    background-color: #212121;
    margin: 0;
    padding: ${SPACING.MEDIUM};
  }
  .more {
    width: 100%;
    font-size: 2rem;
    color: white;
    padding: 0.5rem;
    background-color: #1a1a1a;
    :hover {
      background-color: #454545;
    }
  }
  @media (max-width: ${MOBILE_MAX_SIZE}) {
    > h2 {
      display: ${props => props.expanded ? 'block' : 'none'};
      transition: display .3s ease;
    }
    width: ${props => props.expanded ? EXPANDED_PANEL_SIZE : COLLAPSED_PANEL_SIZE};
    transition: width .3s ease;
    z-index: 1;
    &.arrow {
      display: block;
      height: 100%;
      width: ${COLLAPSED_PANEL_SIZE};
      color: white;
    }
  }
`

export default function PostList({
  posts,
  onDismiss,
  onSelect,
  expanded,
  onExpandToogle,
  onLoadMore,
  loadingMore,
}) {
  return (
    <PostListContainer expanded={expanded}>
      <h2>Reddit Posts</h2>
      <PostListElement expanded={expanded}>
        {posts.map(post =>
          <PostListItem
            {...post}
            key={post.id}
            onSelect={() => onSelect(post)}
            onDismiss={() => onDismiss(post)}
          />
        )}
      </PostListElement>
      <Button onClick={onLoadMore} className="more">
        {loadingMore ? 'Loading...' : 'Load More'}
      </Button>
      {!expanded && <Button onClick={onExpandToogle} className="arrow"><FaChevronRight /></Button>}
    </PostListContainer>
  )
}