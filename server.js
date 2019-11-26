const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); //Lets us build out pathing for our directories
const compression = require('compression');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config(); //This loads the dotenv into our process environment which allows our process.env now to access that secret key

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json()); //parse input
app.use(bodyParser.urlencoded({ extended: true })); //urlencoded is a way for us to make sure that the URL strings we're getting in and we're passing out do not contain things lkke spaces or symbols

app.use(cors()); //Cross-Origin Request so we're actually able to properly make requests to our backend server

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    //For every route that is not covered by the future route we write
    res.sendFile(path.join(__dirname, 'client/build', 'index.html')); //Hold all our front end code
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

//Whenever an application requests our app to provide something from this route, we're just going to go into our build foler, get the service-worker.js
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) res.status(500).send({ error: stripeErr });
    else res.status(200).send({ success: stripeRes });
  });
});
