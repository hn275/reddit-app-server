# Reddit App: Server

Server for a minimalistic **Reddit client**.

The client repo is hosted [here](https://github.com/Chuck-Gibson/reddit-app).

## API documentations

Raw API response from Reddit has a lot of information that would not be needed
for this project.

Relevent data has been extracted and [documented](./docs/API.md).

## Dependencies

1. ExpressJS: Server.
2. CORS: an Express middleware, for enabling Cross-Origin Resource Sharing.
3. Axios: HTTP request library.
4. Nodemon (dev dependency): hot reload server on bufwrite.

Don't forget to `npm i` after cloning to install dependencies :).

### TODO

- Creating endpoints:
  - [x] GET: all posts.
  - [x] GET: comments.
  - [x] GET: search function.
  - [ ] OAuth2Authenticate.
    - [ ] POST: votes.
    - [ ] POST: comments/replies.
- [ ] Database to store user token (PostGreSQL or MongoDB?).
