const API = {
  getAccessToken: async authorizationCode => {
    const res = await fetch(`./reddit_token?code=${authorizationCode}`);
    const data = await res.json();
    if (!data.access_token) {
      throw new Error();
    }
    return data.access_token;
  },
  getTopPosts: async accessToken => {
    // TODO: refactor, move uri to constants
    const res = await fetch('https://oauth.reddit.com/top', {
      headers: new Headers({ Authorization: `Bearer ${accessToken}` })
    });

    if (!res.status === 401) {
      throw new Error('Invalid session');
    }

    if (!res.ok) {
      throw new Error('Error from API');
    }

    const data = await res.json();
    return data.data.children.map(item => item.data);
  }
}

export default API;