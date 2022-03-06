import chai from 'chai';
const expect = chai.expect;
import Destinations from '../src/Destinations.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler, destinationsTestData} from '../src/testData';

describe('Destinations', () => {

  let destinations;

  beforeEach(() => {
    destinations = new Destinations(destinationsTestData);
  });

  it('should be a function', () => {
    expect(Destinations).to.be.a('function');
    expect(Destinations).to.not.be.a('string');
    expect(Destinations).to.not.be.an('integer');
    expect(Destinations).to.not.be.an('object');
  });

  it('should hold all of the trips data', () => {
    expect(destinations.data).to.equal(destinationsTestData);
    expect(destinations.data).to.not.equal(oneTrip);
    expect(destinations.data).to.not.equal(travelersTestData);
  });

  it('should contain all of the trip objects found in the data', () => {
    for (let i = 0; i < destinations.data.destinations.length; i++) {
      expect(destinations.data.destinations[i]).to.equal(destinationsTestData.destinations[i]);
    }
    for (let i = 0; i < destinations.data.destinations.length; i++) {
      expect(destinations.data.destinations[i]).to.not.equal(travelersTestData.travelers[i]);
    }
  });

  it('should only contain objects with "id", "name", and "travelerType" as keys', () => {
    for (let i = 0; i < destinations.data.destinations.length; i++) {
      expect(destinations.data.destinations[i]).to.have.all.keys("id", "destination", "estimatedLodgingCostPerDay", "estimatedFlightCostPerPerson", "image", "alt");
    }
    for (let i = 0; i < destinations.data.destinations.length; i++) {
      expect(destinations.data.destinations[i]).to.not.have.same.keys("name", "travelerType");
    }
  });

});
