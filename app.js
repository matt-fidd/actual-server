require('source-map-support').install();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const accountApp = require('./app-account');
const syncApp = require('./app-sync');

const app = express();

process.on('unhandledRejection', reason => {
  console.log('Rejection:', reason);
});

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.raw({ type: 'application/actual-sync', limit: '20mb' }));
app.use(bodyParser.raw({ type: 'application/encrypted-file', limit: '50mb' }));

app.use('/sync', syncApp.handlers);
app.use('/account', accountApp.handlers);

app.get('/', (req, res) => {
  res.send(config.mode);
});

async function run() {
  await accountApp.init();
  await syncApp.init();

  console.log('Listening on ' + config.port + '...');
  app.listen(config.port);
}

run().catch(err => {
  console.log('Error starting app:', err);
  process.exit(1);
});