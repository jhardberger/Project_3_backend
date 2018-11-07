const express = require('express');
const router = express.Router();


router.get('/data', async (req, res) => {
	
	try {
		// const geoJson = await fetch('https://maps.googleapis.com/maps/api/')
	} catch(err){
		next(err)
	}
	
});

module.exports = router;