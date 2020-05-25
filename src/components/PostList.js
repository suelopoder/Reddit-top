import React from 'react';
import styled from 'styled-components';
import BlueDot from './BlueDot';
import { FaChevronRight } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const PostListWrapper = styled.ul`
  padding: 0;
  margin: 0;
  width: 350px;
  background: black;
  li {
    background: black;
    color: white;
    padding: 0.5rem;
    border-bottom: 1px dashed white;
    margin-bottom: 0.5rem;
    header {
      display: flex;
      align-items: baseline;
      h2 {
        margin: 0 0.8rem;
        font-size: 2rem;
      }
      span {
        color: lightgray;
        font-size: 0.8rem;
      }
    }
    .post-item-content {
      display: flex;
      justify-content: space-between;
      img {
        widht: 50px;
      }
      p {
        align-self: flex-start;
        padding-left: 5px;
      }
      button {
        background: transparent;
        border: 0;
        color: white;
        width: 25px;
        padding: 0;
      }
      button:hover {
        cursor: pointer;
      }
    }
    footer {
      display: flex;
      align-items: center;
      button {
        background: transparent;
        border: 0;
        color: white;
        font-size: 1.2rem;
      }
      button:hover {
        cursor: pointer;
      }
      button > b {
        color: #bc5e0e;
        vertical-align: middle;
      }
      > span {
        color: #bc5e0e;
      }
    }
  }
`

export function PostItem({ author, time, imgUrl, title, comments, onDismiss }) {
  return (
    <li>
      <header>
        <BlueDot />
        <h2>{author}</h2>
        <span>{time}</span>
      </header>
      <div className="post-item-content">
        {imgUrl && <img src={imgUrl} alt={title} />}
        <p>{title}</p>
        <button><FaChevronRight /></button>
      </div>
      <footer>
        {onDismiss && (
          <button onClick={onDismiss}>
            <b><AiOutlineCloseCircle /></b>
            &nbsp;
            <span>Dismiss Post</span>
          </button>
        )}
        <span>{comments} comments</span>
      </footer>
    </li>
  )
}

export default function PostList({ posts, onDismiss, onSelect }) {
  return (
    <PostListWrapper>
      {posts.map(post =>
        <PostItem
          {...post}
          key={post.id}
          onSelect={() => onSelect(post)}
          onDismiss={() => onDismiss(post)}
        />
      )}
    </PostListWrapper>
  )
}