// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
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
const dashboard = document.querySelector('.dashboard')

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
let makePromise = (id) => {Promise.all([fetchData('trips'), fetchData('travelers'), fetchData('destinations'), fetchInstance('travelers', id)]).then(data => {
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
}

const hidePage = () => {
  loginPage.className += ' hidden';
}

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
  makePromise(43);
  eventParam.target.reset();
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
  `;
  tripForm.userID = travelerData.id;
  tripForm.destinations = destinationData;
  tripForm.trips = tripData;
}

const loadTripReel = (reelSelector, tripDataSet, destinationDataSet, traveler) => {
  reelSelector.innerHTML = '';
  tripDataSet.forEach(entry => {
    let destinationOutput = destinationDataSet.data.destinations.find(destination => entry.destinationID === destination.id);
    reelSelector.innerHTML += `
      <div class="trip-box" id=${entry.id}>
        <h6 class="photo-title"> ${destinationOutput.destination} </h6>
        <img class="photo" src="${destinationOutput.image}" alt="${destinationOutput.alt}" />
        <h6 class="photo-text alt-text"> ${entry.date} </h6>
      </div>
    `;
  })
}

const loadDestinations = (destinationData) => {
  destinationList.innerHTML = '';
  destinationData.data.destinations.forEach(destination => {
    destinationList.innerHTML += `
      <option id=${destination.id}> ${destination.destination} </option>
    `
  })
}

const postData = (url, newData) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    console.log(response, "response")
      if(!response.ok) {
        throw new Error(`Please make sure that all fields are filled in.`);
      } else {
      response.json()
    }
  }).catch(error => console.log(error));
}

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
      <h6> Total Cost: ${totalCost}</h6>
    `;
  };
  // eventParam.target.reset();
}






// EVENT LISTENERS
window.addEventListener('onload', makePromise(44)); /////////

// 43 has spent money in the first 2 months of 2022.
// 44 has lots of data.
// 45 has pending data.

loginPage.addEventListener('submit', (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let username = formData.get('username');
  let password = formData.get('password');
  if (username.includes('traveler') && (password === 'travel')) {
    let userNum = username.replace('traveler', '');
    if (Number.isInteger(parseInt(userNum))) {
      let loginID = parseInt(userNum);
      console.log(loginID);
      hidePage();
      showPage();
      makePromise(loginID);
    }
  }
  e.target.reset();
});

tripForm.addEventListener('submit', (e) => {
  postTripForm(e);
  // e.preventDefault();
  // const formData = new FormData(e.target);
  // const lastTripID = e.target.trips.data.trips.length;
  // const destName = formData.get('destination-list');
  // const destIDObj = e.target.destinations.data.destinations.find(destination => destination.destination === destName);
  // const formattedDate = formData.get('date').replaceAll('-','/');
  // const newTrip = {
  //   id: lastTripID + 1,
  //   userID: parseInt(e.target.userID),
  //   destinationID: destIDObj.id,
  //   travelers: parseInt(formData.get('guests')),
  //   date: formattedDate,
  //   duration: parseInt(formData.get('duration')),
  //   status: "pending",
  //   suggestedActivities: []
  // };
  // console.log(newTrip);
  // postData(tripURL, newTrip);
  // makePromise(43);
  // e.target.reset();
});

tripForm.addEventListener('mouseover', (e) => {
  calculateTripCost(e);
  // e.preventDefault();
  // const formData = new FormData(e.target);
  // const destName = formData.get('destination-list');
  // const destIDObj = e.target.destinations.data.destinations.find(destination => destination.destination === destName);
  //
  // let totalLodgingCost = destIDObj.estimatedLodgingCostPerDay * parseInt(formData.get('duration'));
  // let totalAirfare = destIDObj.estimatedFlightCostPerPerson * parseInt(formData.get('guests')) * 2;
  // let totalAgentFee = (totalLodgingCost + totalAirfare) * 0.01;
  // let totalCost = totalLodgingCost + totalAirfare + totalAgentFee;
  // let costLedger = [totalLodgingCost, totalAirfare, totalAgentFee, totalCost];
  //
  // if (totalCost) {
  //   formTotal.innerHTML = '';
  //   formTotal.innerHTML += `
  //     <h6> Total Cost: ${totalCost}</h6>
  //   `;
  // };
  // formTotal.innerHTML += `
  //   <p> Lodging: ${totalLodgingCost} </p>
  //   <p> Airfare: ${totalAirfare} </p>
  //   <p> Agent Fee: ${totalAgentFee} </p>
  //   <p> Total: ${totalCost }</p>
  // `;
  // e.target.reset();
});
