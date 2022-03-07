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
import {tripsTestData, oneTrip, travelersTestData, oneTraveler, destinationsTestData} from '../src/testData';
import {fetchData} from './apiCalls.js';
import {updateMainBox, updateHydrationBox, updateSleepBox} from './domUpdates.js'
