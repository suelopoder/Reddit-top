import React from 'react';

export function PostItem({ author, time, imgUrl, title, comments }) {
  return (
    <li>
      {author}
      {time}
      {imgUrl}
      {title}
      {comments}
    </li>
  )
}

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map(post => <PostItem {...post} key={post.id} />)}
    </ul>
  )
}