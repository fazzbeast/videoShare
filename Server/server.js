require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
// enable all CORS requests
app.use(cors());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

app.listen(process.env.PORT || 5000, () => console.log('Listening on port 5000'));
