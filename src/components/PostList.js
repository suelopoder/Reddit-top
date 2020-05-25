import React from 'react';
import styled from 'styled-components';
import BlueDot from './BlueDot';
import { FaChevronRight } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const HOUR_IN_MS = 1000 * 60 * 60;
const getCreatedTimeLabel = timeCreated => {
  if (!timeCreated) return null;
  const time = +new Date(timeCreated * 1000);
  const now = +new Date();
  const diff = Math.ceil((now - time) / HOUR_IN_MS);
  return `${diff} hours ago`;
}

const PostListWrapper = styled.nav`
  background: black;
  > h2 {
    color: white;
    text-align: center;
    background-color: #212121;
    margin: 0;
    padding: 1rem;
  }
  ul {
    padding: 0;
    margin: 0;
    width: 350px;
    flex: 1;

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
          flex: 7;
          max-height: 150px;
          margin: auto;
        }
        p {
          flex: 7;
          align-self: flex-start;
          padding-left: 5px;
        }
        button {
          flex: 1;
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
  }
`

export function PostItem({ author, time, imgUrl, title, comments, seen, onDismiss, onSelect }) {
  return (
    <li>
      <header>
        {!seen && <BlueDot />}
        <h2>{author}</h2>
        <span>{getCreatedTimeLabel(time)}</span>
      </header>
      <div className="post-item-content">
        {imgUrl && <img src={imgUrl} alt={title} />}
        <p>{title}</p>
        <button onClick={onSelect}><FaChevronRight /></button>
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
      <h2>Reddit Posts</h2>
      <ul>
        {posts.map(post =>
          <PostItem
            {...post}
            key={post.id}
            onSelect={() => onSelect(post)}
            onDismiss={() => onDismiss(post)}
          />
        )}
      </ul>
    </PostListWrapper>
  )
}