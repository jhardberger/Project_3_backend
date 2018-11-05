const express 		= require('express');
const app			= express();
const bodyParser	= require('body-parser');
const cors 			= require('cors');
const PORT 			= process.env.PORT || 9000;

require('./db/db');

//API CONNECTOR

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

//REQUIRE CONTROLLERS
const censusController = require('./controllers/censusController');
const mapController = require('./controllers/mapController');
app.use('/api/v1/census', censusController);

//USE MIDDLEWARE

app.listen(PORT, () => {
	console.log('listening on port: ' + PORT);
})