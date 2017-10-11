# tweeties #

The Tweets of Champions.

## Overview ##

This application is a demonstration of a universal/isomorphic web app that utilizes the Twitter API. It displays a input box which the user can use to write a "tweet", and within the message, can include Twitter handles (@twitter for instance). These Twitter handles are looked up via the Twitter API to provide auto-complete capabilities. The user can then "send" the tweet which just appends it to their list of tweets (no tweets were actually sent during the making of this app).

The application uses Express on the server side for APIs, and React and Redux on the client side to display the page. Webpack and Babel are used throughout to package up the deliverable, and the application also takes advantage of server side rendering for the initial page request. CSS modules (using Sass) are used for styling, ESLint for linting, and Jest for tests.

## Getting Started ##

Install Node (I recommend [nvm](https://github.com/creationix/nvm)) and [yarn](https://yarnpkg.com), and install the dependencies:

```
$ yarn
```

(_Node version 6 was used in creating this application. Other versions of Node have not been verified, use at your own risk._)

To start the application (in development mode), run the following command:

```
$ npm start
```

For production, run the following commands:

```
$ npm run build

...

$ npm run production
```

## Tests ##

Tests are available within the `test` directory. To execute the tests, run the following command:

```
$ npm test
```

To run the tests in watch mode:

```
$ npm run test:watch
```

## Development Modes ##

Additional modes of running the application are provided for development purposes:

### Mock Mode ###

To avoid unnecessary hits to the Twitter API (for testing purposes), a mock mode is provide which generates mock users when needed for the auto-complete Twitter handles. To run mock mode execute the following command:

```
$ npm run mock
```

Again, this will NOT make actual calls to the Twitter API but instead generate mock data at the API layer.

### API Only ###

When developing solely on the APIs, it is quicker to avoid launching Webpack on restarts. The API only mode will only launch the Express server to provide quicker restarts during development. To run API only mode, use the following environment variable when running the application:

```
$ API_ONLY=true npm start
```
