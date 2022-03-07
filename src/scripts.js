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
import {fetchData} from './apiCalls.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler, destinationsTestData} from './testData';

// DOM
let makePromise = () => {Promise.all([fetchData('trips'), fetchData('travelers'), fetchData('destinations')]).then(data => {
  console.log(data);
  let trips = new Trips(data[0].trips);
  let travelers = new Travelers(data[1].travelers);
  let destinations = new Destinations(data[2].destinations);
  console.log(trips);
  console.log(travelers);
  console.log(destinations);
  // let activityRepo = new UserRepository(data[3].activityData)
  // let jarvis = new User(newRepo.allData[1]);
  // let hydration = new Hydration(jarvis.id, hydrationRepo);
  // let sleep = new Sleep(jarvis.id, sleepRepo);
  // let activity = new Activity(jarvis.id, activityRepo);
  // updateMainBox(jarvis, newRepo);
  // updateHydrationBox(hydration);
  // updateSleepBox(sleep);
  })
};

// EVENT LISTENERS
window.addEventListener("onload", makePromise());
