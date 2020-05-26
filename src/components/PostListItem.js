import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import BlueDot from './BlueDot';
import Button from './Button';
import { getCreatedTimeLabel } from '../helpers';
import { COLORS, SPACING } from '../constants';

const Header = styled.header`
  display: flex;
  align-items: baseline;
  h2 {
    margin: 0 ${SPACING.SMALL};
    font-size: 2rem;
  }
  span {
    color: lightgray;
    font-size: ${SPACING.SMALL};
  }
`

const Content = styled.div`
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
    color: white;
    width: 25px;
    padding: 0;
  }
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  button {
    color: inherit;
    font-size: ${SPACING.LARGE};
  }
  button > b {
    color: ${COLORS.HIGHLIGHT};
    vertical-align: middle;
  }
  > span {
    color: ${COLORS.HIGHLIGHT};
  }
`

const PostListItemElem = styled.li`
  background: black;
  color: ${props => props.seen ? '#858585' : 'white'};
  transition: color .3s ease, opacity 1s ease;
  padding: 0.5rem;
  border-bottom: 1px dashed white;
  margin-bottom: 0.5rem;
  &.dismissable {
    opacity: 0;
  }
`

export default function PostListItem({ author, time, imgUrl, title, comments, seen, onDismiss, onSelect }) {
  const dismissTimeoutRef = useRef(false);
  const elemRef = useRef(null);

  useEffect(() => {
    return () => { clearTimeout(dismissTimeoutRef.current); }
  });

  function onDismissClick() {
    elemRef.current.classList.toggle('dismissable');
    dismissTimeoutRef.current = setTimeout(onDismiss, 800);
  }

  return (
    <PostListItemElem seen={seen} ref={elemRef}>
      <Header>
        {!seen && <BlueDot />}
        <h2>{author}</h2>
        <span>{getCreatedTimeLabel(time)}</span>
      </Header>
      <Content onClick={onSelect}>
        {imgUrl && <img src={imgUrl} alt={title} />}
        <p>{title}</p>
        <Button onClick={onSelect}><FaChevronRight /></Button>
      </Content>
      <Footer>
        {onDismiss && (
          <Button onClick={onDismissClick}>
            <b><AiOutlineCloseCircle /></b>
            &nbsp;
            <span>Dismiss Post</span>
          </Button>
        )}
        <span>{comments} comments</span>
      </Footer>
    </PostListItemElem>
  )
}