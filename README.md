# Front-end Test

## About

This app is built to complete an interview test. It renders reddit hot topics.
Its bootstrapped from create-react-app and has a minimal server to help with reddit oauth credentials.

## Running

First copy `.env.example` file to `.env` and configure it.
Then run `npm run build` to build the client and finally `npm start`.

## Development

To run a dev version of the client run `npm run client`.

To run a dev version of the server run `npm run server`. This runs the server with nodemon so changes on server folder are instantly reflected.

## TODO

As every project this one has room for improvement. Some stuff from that list:

- add proptypes
- cleanup server code
- cleanup CSS in post list
- refactor animation code to be shared

## Notes

### Login

This app uses reddit oauth API. So for a first use you need to authorize reddit to provide data for the app. In order to do that the app redirects to reddit authorize page. Then reddit redirects back with an authorization code. The app clears that authorization code from the url for security reasons.

For the first render we are forced to send the user though login because there is no data to show. For a second visit we have some data to hidrate, however we can or not send them though login on background data fetch error. I decided to send the user to login or else this is an unrecoverable state. That is, once you have stored data and token expired, there is no functionality to login again. This could be easily changed by checking data on store before sending to login.

### Handling secrets

Reddit app data is not public so its not commited to the repo nor served to the client side. This data can be configured in `.env` file.

### Testing

Testing is a very important topic for me. It was not requested though, so I added some test to example some tests.

### Hosting

App is hosted in <http://ec2-3-16-76-129.us-east-2.compute.amazonaws.com/> I went for AWS EC2 as I am familiar with the UI and a simple server is included on AWS free tier.

### Deployment

Deployment is done manually by loggin into a server and:

- configuring `.env` file
- running `npm i`
- running `npm run build`
- running `npm start`

You can set the `SERVER_PORT` variable in `.env` to change the default port (3001)

This process can be improved by dockerizing the app.

### Data sotorage

Data is stored using localstorage. I could have used cookies but I though this was a simpler yet functional approach.

### Performing API calls

I went for a React hooks approach, dispatching actions there. An alternative would have been using a redux middleware. I decide the hook approach was a better fit.

### `redditDataMiddleware` middleware

I noticed storing reddit posts and seen data become a bit dirty on the code, so I decided to build a small middleware that watches for some actions and stores the data.

### Data reload

Data is stored by keys so when new data arrives old data is updated and new data is added to the list. We could improve the functionality by polling data on interval or subscribing to a live endpoint.

### Accesibility

Some elements are intentionally left with an outline for accesibility reasons. Examples are the dismiss button and the arrow to present main content. Try navigating the app with tabs.

### Pagination

After loading multiple pages the DOM can get quite big. To clear data from storage run this on browser console: `localStorage.removeItem('REDDIT_CLIENT__REDDIT_POSTS')`

Please consider that posts under `/top` are not sorted by chronologically so the "hours ago" may look weird.

Also, when reloading the app we start loading pages from the start again. This may feel strange when you have quite some data stored, but it's intentional so we refresh that data.

### React hooks vs async actions

For side effects I went for a React hooks approach instead of an async redux actions. The reason for that is that react hooks are newer and in a simple project they probably make more sense. If I were to rebuild this I would use the later since they seem a better fir for redux itself.
