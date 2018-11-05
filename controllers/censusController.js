const express = require('express');
const router = express.Router();
require('es6-promise').polyfill();
require('isomorphic-fetch');
const apiKey = require('../apiKey');
//will need to bring in geographical models here
const State = require('../models/state');
const Place = require('../models/place');

const baseEndPoint = 'https://api.census.gov/data/2017/pep/population?get='

//State seed route--THIS HAS BEEN RUN
router.get('/seed/states', async (req,res,next) => {
	try {
		//make api call
		const allStates = await fetch(baseEndPoint + 'GEONAME,POP,DENSITY&for=state');
		const allStatesJson = await allStates.json();
		const allStatesMap = await allStatesJson.map((state,i) => {
			return ({
				name: state[0],
				pop: state[1],
				density: state[2],
				code: state[3]
			})
		})
		for(let i = 1; i < allStatesMap.length; i++) {
			await State.create(allStatesMap[i]);
		}
		res.send(allStatesMap);
	} catch(err) {
		next(err);
	}
})

//Place seed route--THIS HAS BEEN RUN
router.get('/seed/places', async (req,res,next) => {
	try {
		//make api call
		const allPlaces = await fetch(baseEndPoint + 'GEONAME,POP,DENSITY&for=place:*&key=' + apiKey);
		const allPlacesJson = await allPlaces.json();
		const allPlacesMap = await allPlacesJson.map((place,i) => {
			return ({
				name: place[0],
				pop: place[1],
				density: place[2],
				stateCode: place[3],
				placeCode: place[4]
			})
		})
		for(let i = 1; i < allPlacesMap.length; i++) {
			await Place.create(allPlacesMap[i]);
		}
		res.send(allPlacesMap);
	} catch(err) {
		next(err);
	}
})


module.exports = router;