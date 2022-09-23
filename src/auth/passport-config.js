if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const RedditStrategy = require('passport-reddit').Strategy;

const initialize = (passport) => {
  passport.use(
    new RedditStrategy(
      {
        /* code implementation */
      },
      (accessToken, refreshToken, profile, done) => {}
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};

module.exports = initialize;
