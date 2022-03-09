import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips.js';
import Trip from '../src/Trip.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler} from '../src/testData';

describe('Trip', () => {

  let trip;
  // let trips;

  beforeEach(() => {
    trip = new Trip(oneTrip);
    // trips = new Trips(tripsTestData);
  });

  it('should take in an object as a parameter', () => {
    expect(oneTrip).to.be.an('object');
    expect(oneTrip).to.not.be.a('string');
    expect(oneTrip).to.not.be.an('integer');
    expect(oneTrip).to.not.be.a('function');
  });

  it('should hold the trip ID', () => {
    expect(trip.id).to.equal(1);
    expect(trip.id).to.not.equal(2);
  });

  it('should hold the user ID', () => {
    expect(trip.userID).to.equal(44);
    expect(trip.userID).to.not.equal(35);
  });

  it('should hold the destination ID', () => {
    expect(trip.destinationID).to.equal(49);
    expect(trip.destinationID).to.not.equal(25);
  });

  it('should hold the number of travelers', () => {
    expect(trip.travelers).to.equal(1);
    expect(trip.travelers).to.not.equal(5);
  });

  it('should hold the date of the trip', () => {
    expect(trip.date).to.equal('2022/09/16');
    expect(trip.date).to.not.equal('2022/10/04');
  });

  it('should hold the duration of the trip', () => {
    expect(trip.duration).to.equal(8);
    expect(trip.duration).to.not.equal(18);
  });

  it('should hold the status of the trip', () => {
    expect(trip.status).to.equal('approved');
    expect(trip.status).to.not.equal('pending');
  });

  it('should be able to hold suggested activities', () => {
    expect(trip.suggestedActivities).to.deep.equal([]);
  });

});
