import React from 'react';
import { render } from '@testing-library/react';
import PostDetail from './PostDetail';

test('renders post data', () => {
  const post = {
    author: 'Diego Sisto',
    title: 'How to build an amazing Reddit clone'
  };
  const { getByText } = render(<PostDetail post={post} />);
  expect(getByText('Diego Sisto')).toBeInTheDocument();
  expect(getByText('How to build an amazing Reddit clone')).toBeInTheDocument();
});
