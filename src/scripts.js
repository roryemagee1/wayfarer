// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Trips from './Trips.js';
import Trip from './Trip.js'
import Travelers from './Travelers.js';
import Traveler from './Traveler.js';
import Destinations from './Destinations.js';
import {fetchData, fetchInstance} from './apiCalls.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler, destinationsTestData} from './testData';

// QUERY SELECTORS
const profileIcons = document.querySelector('.profile-icons');

const upcomingTrips = document.querySelector('.upcoming-trips');
const pendingTrips = document.querySelector('.pending-trips');
const pastTrips = document.querySelector('.past-trips');

const upcomingTripsReel = document.querySelector('.upcoming-reel');
const pendingTripsReel = document.querySelector('.pending-reel');
const pastTripsReel = document.querySelector('.past-reel');

// DOM
let makePromise = (id) => {Promise.all([fetchData('trips'), fetchData('travelers'), fetchData('destinations'), fetchInstance('travelers', id)]).then(data => {
  console.log(data);
  let trips = new Trips(data[0]);
  let travelers = new Travelers(data[1]);
  let destinations = new Destinations(data[2]);
  let traveler = new Traveler(data[3]);
  let upcomingData = trips.retrieveFutureTrips(traveler, trips.getTodayDate());
  let pendingData = trips.retrievePendingTrips(traveler)
  let pastData = trips.retrievePastTrips(traveler, trips.getTodayDate());
  // console.log(upcomingData);
  // console.log(pendingData);
  // console.log(pastData)
  console.log(trips);
  // console.log(travelers);
  console.log(destinations);
  console.log(traveler);
  loadProfile(traveler, trips, destinations);
  loadTripReel(upcomingTripsReel, upcomingData, destinations, traveler);
  loadTripReel(pendingTripsReel, pendingData, destinations, traveler);
  loadTripReel(pastTripsReel, pastData, destinations, traveler);
  })
  .catch(error => console.log(error));
};

// FUNCTIONS

const loadTripReel = (reelSelector, tripDataSet, destinationDataSet, traveler) => {
  console.log(tripDataSet);
  console.log(destinationDataSet);
  reelSelector.innerHTML = '';
  tripDataSet.forEach(entry => {
    let destinationOutput = destinationDataSet.data.destinations.find(destination => entry.destinationID === destination.id);
    console.log(destinationOutput);
    reelSelector.innerHTML += `
      <div class="trip-box" id=${entry.id}>
        <h6> ${destinationOutput.destination} </h6>
        <img src="${destinationOutput.image}" alt="${destinationOutput.alt}" />
        <h6> ${entry.date} </h6>
      </div>
    `;
  })
}

const loadProfile = (travelerData, tripData, destinationData) => {
  profileIcons.innerHTML = '';
  profileIcons.innerHTML += `
    <div class="profile-icons">
      <div>
      <h5> Username: ${travelerData.name} </h5>
      <h5> Year Spent: ${tripData.getTotalSpent(travelerData, destinationData)} </h5>
      </div>
      <h1> Settings </h1>
    </div>
  `
}

// EVENT LISTENERS
window.addEventListener("onload", makePromise(43));

// 44 has lots of data.
// 45 has pending data.
