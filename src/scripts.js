import './css/styles.css';
import './images/Algarve-photo-1.png'
import './images/Algarve-photo-2.png'
import Trips from './Trips.js';
import Trip from './Trip.js'
import Travelers from './Travelers.js';
import Traveler from './Traveler.js';
import Destinations from './Destinations.js';
import {fetchData, fetchInstance} from './apiCalls.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler, destinationsTestData} from './testData';

const tripURL = 'http://localhost:3001/api/v1/trips';

// QUERY SELECTORS
const loginPage = document.querySelector('.login-page');
const dashboard = document.querySelector('.dashboard');
const loginStatus = document.querySelector('.login-status');
const profileIcons = document.querySelector('.profile-icons');
const upcomingTrips = document.querySelector('.upcoming-trips');
const pendingTrips = document.querySelector('.pending-trips');
const pastTrips = document.querySelector('.past-trips');
const upcomingTripsReel = document.querySelector('.upcoming-reel');
const pendingTripsReel = document.querySelector('.pending-reel');
const pastTripsReel = document.querySelector('.past-reel');
const destinationList = document.querySelector('.destination-list');
const tripForm = document.querySelector('.trip-form');
const formTotal = document.querySelector('.form-total');
const submitForm = document.querySelector('.submit-form');

// DOM
let makePromise = (id) => {
  Promise.all([fetchData('trips'), fetchData('travelers'), fetchData('destinations'), fetchInstance('travelers', id)])
.then(data => {
  let trips = new Trips(data[0]);
  let travelers = new Travelers(data[1]);
  let destinations = new Destinations(data[2]);
  let traveler = new Traveler(data[3]);
  let upcomingData = trips.retrievePresentAndFutureTrips(traveler, trips.getTodayDate());
  let pendingData = trips.retrievePendingTrips(traveler)
  let pastData = trips.retrievePastTrips(traveler, trips.getTodayDate());
  loadProfile(traveler, trips, destinations);
  loadDestinations(destinations);
  loadTripReel(upcomingTripsReel, upcomingData, destinations, traveler);
  loadTripReel(pendingTripsReel, pendingData, destinations, traveler);
  loadTripReel(pastTripsReel, pastData, destinations, traveler);
  })
  .catch(error => console.log(error));
};

// FUNCTIONS

const showPage = () => {
  dashboard.className = 'dashboard';
};

const hidePage = () => {
  loginPage.className += ' hidden';
};

const updateLoginStatus = () => {
  loginStatus.innerText = '';
  loginStatus.innerText += `Login failed, try again!'`;
  setTimeout(clearLoginStatus, 3000);
};

const clearLoginStatus = () => {
  loginStatus.innerText = '';
};

const loginToPage = (eventParam) => {
  eventParam.preventDefault();
  let formData = new FormData(eventParam.target);
  let username = formData.get('username');
  let password = formData.get('password');
  if (username.includes('traveler') && (password === 'travel')) {
    let userNum = username.replace('traveler', '');
    if (Number.isInteger(parseInt(userNum))) {
      let loginID = parseInt(userNum);
      hidePage();
      showPage();
      makePromise(loginID);
    } else {
      updateLoginStatus();
    };
  } else {
    updateLoginStatus();
  };
  eventParam.target.reset();
};

const loadProfile = (travelerData, tripData, destinationData) => {
  profileIcons.innerHTML = '';
  profileIcons.innerHTML += `
    <div class="profile-icons">
    <div>
    <h1> Username: ${travelerData.name} </h1>
    <h1> Spent this Year: ${tripData.getTotalSpent(travelerData, destinationData)} </h5>
    </div>
    <h1> Settings </h1>
    </div>
  `;
  tripForm.userID = travelerData.id;
  tripForm.destinations = destinationData;
  tripForm.trips = tripData;
};

const loadTripReel = (reelSelector, tripDataSet, destinationDataSet, traveler) => {
  reelSelector.innerHTML = '';
  tripDataSet.forEach(entry => {
    let destinationOutput = destinationDataSet.data.destinations.find(destination => entry.destinationID === destination.id);
    reelSelector.innerHTML += `
      <div class="trip-box" id=${entry.id}>
        <p class="photo-title"><strong> ${destinationOutput.destination} </strong></p>
        <img class="photo" src="${destinationOutput.image}" alt="${destinationOutput.alt}" />
        <p class="photo-text alt-text"> ${entry.date} </p>
      </div>
    `;
  });
};

const loadDestinations = (destinationData) => {
  destinationList.innerHTML = '';
  destinationData.data.destinations.forEach(destination => {
    destinationList.innerHTML += `
      <option id=${destination.id}> ${destination.destination} </option>
    `;
  });
};

const postTripForm = (eventParam) => {
  eventParam.preventDefault();
  const formData = new FormData(eventParam.target);
  const lastTripID = eventParam.target.trips.data.trips.length;
  const destName = formData.get('destination-list');
  const destIDObj = eventParam.target.destinations.data.destinations.find(destination => destination.destination === destName);
  const formattedDate = formData.get('date').replaceAll('-','/');
  const newTrip = {
    id: lastTripID + 1,
    userID: parseInt(eventParam.target.userID),
    destinationID: destIDObj.id,
    travelers: parseInt(formData.get('guests')),
    date: formattedDate,
    duration: parseInt(formData.get('duration')),
    status: "pending",
    suggestedActivities: []
  };
  console.log(newTrip);
  postData(tripURL, newTrip);
  makePromise(eventParam.target.userID);
  eventParam.target.reset();
};

const postData = (url, newData) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    console.log(response, "response")
      if (!response.ok) {
        throw new Error(`Please make sure that all fields are filled in.`);
      } else {
        response.json()
      };
  }).catch(error => console.log(error, "error"));
};

const calculateTripCost = (eventParam) => {
  eventParam.preventDefault();
  const formData = new FormData(eventParam.target);
  const destName = formData.get('destination-list');
  const destIDObj = eventParam.target.destinations.data.destinations.find(destination => destination.destination === destName);
  let totalLodgingCost = destIDObj.estimatedLodgingCostPerDay * parseInt(formData.get('duration'));
  let totalAirfare = destIDObj.estimatedFlightCostPerPerson * parseInt(formData.get('guests')) * 2;
  let totalAgentFee = (totalLodgingCost + totalAirfare) * 0.01;
  let totalCost = totalLodgingCost + totalAirfare + totalAgentFee;
  let costLedger = [totalLodgingCost, totalAirfare, totalAgentFee, totalCost];
  if (totalCost) {
    formTotal.innerHTML = '';
    formTotal.innerHTML += `
      <p> Total Cost: ${totalCost}</p>
    `;
  };
};


// EVENT LISTENERS

// window.addEventListener('onload', makePromise(44)); <-- I'm leaving this in here because it helps whenever I need to disable the login page to work on the dashboard.

loginPage.addEventListener('submit', (e) => {
  loginToPage(e);
});

tripForm.addEventListener('submit', (e) => {
  postTripForm(e);
});

submitForm.addEventListener('mouseover', (e) => {
  calculateTripCost(e);
});

tripForm.addEventListener('mouseover', (e) => {
  calculateTripCost(e);
});
