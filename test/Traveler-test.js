import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler.js';
import Trips from '../src/Traveler.js'
import {tripsTestData, oneTrip, travelersTestData, oneTraveler} from '../src/testData.js';

describe('Traveler', () => {

  let traveler;
  let trips;

  beforeEach(() => {
    traveler = new Traveler(oneTraveler);
    trips = new Trips(tripsTestData);
  });

  it('should take in an object as a parameter', () => {
    expect(oneTraveler).to.be.an('object');
    expect(oneTraveler).to.not.be.a('string');
    expect(oneTraveler).to.not.be.an('integer');
    expect(oneTraveler).to.not.be.a('function');
  });

  it('should hold the user ID', () => {
    expect(traveler.id).to.equal(1);
    expect(traveler.id).to.not.equal(2);
  });

  it('should hold the user name', () => {
    expect(traveler.name).to.equal('Ham Leadbeater');
    expect(traveler.name).to.not.equal('Rachel Vaughten');
  });

  it('should hold the user traveler type', () => {
    expect(traveler.travelerType).to.equal('relaxer');
    expect(traveler.travelerType).to.not.equal('thrill-seeker');
  });

  // it('should have a method for pulling all of the user\'s trips', () => {
  //   expect(traveler.retrieveAllTrips(trips)).to.deep.equal([
  //     {"id":1,"userID":1,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
  //     {"id":4,"userID":1,"destinationID":14,"travelers":2,"date":"2022/02/25","duration":10,"status":"approved","suggestedActivities":[]}
  //   ]);
  // });

  it('should have a method for calculating the total spent by the user during the last year', () => {});

});
