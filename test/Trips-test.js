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
    expect(Trips).to.not.be.an('integer');
    expect(Trips).to.not.be.an('object');
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
  });

  it('should only contain objects with "id", "name", and "travelerType" as keys', () => {
    for (let i = 0; i < trips.data.trips; i++) {
      expect(trips.data.trips[i]).to.have.all.keys("userID", "destinationID", "travelers", "date", "duration", "status", "suggestedActivities");
    }
    for (let i = 0; i < trips.data.trips; i++) {
      expect(trips.data.trips[i]).to.not.have.some.keys("id", "name", "travelerType");
    }
  });

});
