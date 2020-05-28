import { validURL } from './helpers';
import { REDDIT_API_URI, TOP_ENDPOINT } from './constants';

const getImage = item => {
  if (!item.thumbnail) return null;
  if (!validURL(item.thumbnail)) return null;
  return item.thumbnail;
}

const apiDataMapper = item => ({
  id: item.data.id,
  author: item.data.author_fullname,
  time: item.data.created_utc,
  imgUrl: getImage(item.data),
  title: item.data.title,
  comments: item.data.num_comments,
});

const API = {
  getAccessToken: async authorizationCode => {
    const res = await fetch(`./reddit_token?code=${authorizationCode}`);
    const data = await res.json();
    if (!data.access_token) {
      throw new Error();
    }
    return data.access_token;
  },
  getTopPosts: async (accessToken, next = null) => {
    const baseUrl = `${REDDIT_API_URI}${TOP_ENDPOINT}`;
    const url = next ? `${baseUrl}?after=${next}` : baseUrl;
    const res = await fetch(url, {
      headers: new Headers({ Authorization: `Bearer ${accessToken}` })
    });

    if (res.status === 401) {
      throw new Error('Invalid session');
    }

    if (!res.ok) {
      throw new Error('Error from API');
    }

    const data = await res.json();
    return {
      data: data.data.children.map(apiDataMapper),
      next: data.data.after,
    }
  }
}

export default API;