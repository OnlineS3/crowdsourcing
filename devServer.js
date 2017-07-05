var path = require('path');
var db = require('./models/index.js');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var api = require('./api/api.js')
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
var request = require('request');

var app = express();
var compiler = webpack(config);

//Configure Auth0
const strategy = new Auth0Strategy({
  domain: 'onlines3.eu.auth0.com',
  clientID: 'MR10gvsqqda9MXjppWw4QHKJe789JV7E',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL:  'http://localhost:8888/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => {
  return done(null, profile);
});
passport.use(strategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.use('/api', api);
app.all(
  '/login',
  passport.authenticate('auth0', {
    clientID: 'MR10gvsqqda9MXjppWw4QHKJe789JV7E',
    domain: 'onlines3.eu.auth0.com',
    redirectUri: 'http://localhost:8888/callback',
    audience: 'https://onlines3.eu.auth0.com/userinfo',
    responseType: 'code',
    scope: 'openid profile'
  }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
  }
);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8888, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8888');
});


//TODO: REMOVE THIS IN PRODUCTION

db.sequelize.sync({force: true})
.then(() => {
  db.Area.create({
    name: "Uusimaa"
  })
}).then(() => {
   db.Area.create({
    name: "Åland"
  })
}).then(() => {
  db.Category.addNew({
    AreaName: "Uusimaa",
    title: "Kategoria",
    description: "kuvaus"
  })
}).then(() => {
  db.Category.addNew({
    AreaName: "Åland",
    title: "Kategoria",
    description: "kuvaus"
  })
});
