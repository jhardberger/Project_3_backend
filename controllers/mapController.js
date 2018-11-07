const express = require('express');
const router = express.Router();
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDrW1HXHM5fEh7XqFd1tneZcT4q3zMNVqU',
  Promise: Promise
});

router.get('/data', async (req, res) => {
	
	try {
		// const geoJson = await fetch('https://maps.googleapis.com/maps/api/')
	} catch(err){
		next(err)
	}
	
});

module.exports = router;