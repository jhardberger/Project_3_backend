const express = require('express');
const router = express.Router();
require('es6-promise').polyfill();
require('isomorphic-fetch');
//will need to bring in geographical models here
const apiKey = require('../apiKey'); //fix later
const State = require('../models/state');
const Place = require('../models/place');
const UserState = require('../models/userState');
const UserPlace = require('../models/userPlace');

const baseEndPoint = 'https://api.census.gov/data/2017/pep/population?get='

//State search route--finds state from local db and returns JSON object
router.get('/stateSearch/:state', async (req,res,next) => {
	try {
		console.log('search route called');
		console.log(req.params.state, 'state');
		const foundState = await State.find({
			name: req.params.state
		})
		console.log(foundState, 'foundState');
		res.json({
			status: 200,
			data: foundState
		})
	} catch(err) {
		next(err);
	}
})

//State post route--user can save their own UserState to non-seed collection
router.post('/state', async (req,res,next) => {
	try {
		console.log(req.body, 'this is req.body');
		const newUserState = await UserState.create(req.body);
		console.log(newUserState);
		res.json({
			status: 200,
			data: newUserState
		})
	} catch(err) {
		next(err);
	}
})

//State delete route--user can delete UserState from user collection
router.delete('/state/:id', async (req,res,next) => {
	try {
		const deletedState = await UserState.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: deletedState
		})
	} catch(err) {
		next(err);
	}
})

//User state get route--feeds all existing user states to front end
router.get('/states', async (req,res,next) => {
	try {
		const userStates = await UserState.find();
		res.json({
			status: 200,
			data: userStates
		})
	} catch(err) {
		next(err);
	}
})

//Place search route--finds place from local db and returns JSON object
router.get('/placeSearch/:place', async (req,res,next) => {
	try {
		console.log('search route called');
		console.log(req.params.place, 'place');
		const placeSearch = req.params.place;
		const foundPlace = await Place.find({
			name: {$regex: ".*"+placeSearch+".*"}
		})
		console.log(foundPlace, 'foundPlace');
		res.json({
			status: 200,
			data: foundPlace
		})
	} catch(err) {
		next(err);
	}
})

//Place post route--user can save their own UserPlace to non-seed collection
router.post('/place', async (req,res,next) => {
	try {
		console.log(req.body, 'this is req.body');
		const newUserPlace = await UserPlace.create(req.body);
		console.log(newUserPlace);
		res.json({
			status: 200,
			data: newUserPlace
		})
	} catch(err) {
		next(err);
	}
})

//User place get route--feeds all existing user places to front end
router.get('/places', async (req,res,next) => {
	try {
		const userPlaces = await UserPlace.find();
		res.json({
			status: 200,
			data: userPlaces
		})
	} catch(err) {
		next(err);
	}
})

//Place delete route--user can delete UserPlace from user collection
router.delete('/place/:id', async (req,res,next) => {
	try {
		const deletedPlace = await UserPlace.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: deletedPlace
		})
	} catch(err) {
		next(err);
	}
})

//State question route
router.get('/question/state', async (req,res,next) => {
	try {
		const randStates = await State.aggregate([{
			$sample: {size: 2}
		}])
		res.json({
			status: 200,
			data: randStates
		})
	} catch(err) {
		next(err);
	}
})

//Place question route
router.get('/question/place', async (req,res,next) => {
	try {
		const randPlaces = await Place.aggregate([
			{$match: {pop: {$gte: 100000}}},
			{$sample: {size: 2}}
		])
		res.json({
			status: 200,
			data: randPlaces
		})
	} catch(err) {
		next(err);
	}
})




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