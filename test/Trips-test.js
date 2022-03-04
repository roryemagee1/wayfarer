import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler} from '../src/testData';

describe('Trips', () => {

  let trips;

  beforeEach(() => {
    trips = new Trips(tripsTestData);

  })

  it('should be a function', () => {
    expect(Trips).to.be.a('function');
    expect(Trips).to.not.be.a('string');
    expect(Trips).to.not.be.a('integer');
  });

  it('should hold all of the trips data', () => {
    expect(trips.data).to.equal(tripsTestData);
    expect(trips.data).to.not.equal(oneTrip);
    expect(trips.data).to.not.equal(travelersTestData);
  });

  it('should contain all of the trip objects found in the data', () => {
    for (let i = 0; i < trips.data.trips.length; i++) {
      expect(trips.data.trips[i]).to.equal(tripsTestData.trips[i]);
    }
    for (let i = 0; i < trips.data.trips.length; i++) {
      expect(trips.data.trips[i]).to.not.equal(travelersTestData.travelers[i]);
    }
  })

});
