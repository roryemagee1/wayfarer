import chai from 'chai';
const expect = chai.expect;
import Travelers from '../src/Travelers.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler} from '../src/testData';

describe('Travelers', () => {

  let travelers;
  // let notTravelers;

  beforeEach(() => {
    travelers = new Travelers(travelersTestData);
    // notTravelers = new Travelers(tripsTestData);
  })

  it('should be a function', () => {
    expect(Travelers).to.be.a('function');
    expect(Travelers).to.not.be.a('string');
    expect(Travelers).to.not.be.an('integer');
    expect(Travelers).to.not.be.an('object');
  });

  it('should hold all of the traveler data', () => {
    expect(travelers.data).to.equal(travelersTestData);
    expect(travelers.data).to.not.equal(oneTraveler);
    expect(travelers.data).to.not.equal(tripsTestData);
  });

  it('should contain all of the traveler objects found in the data', () => {
    for (let i = 0; i < travelers.data.travelers.length; i++) {
      expect(travelers.data.travelers[i]).to.equal(travelersTestData.travelers[i]);
    }
    for (let i = 0; i < travelers.data.travelers.length; i++) {
      expect(travelers.data.travelers[i]).to.not.equal(tripsTestData.trips[i]);
    }
  })

  it('should only contain objects with "id", "name", and "travelerType" as keys', () => {
    for (let i = 0; i < travelers.data.travelers.length; i++) {
      expect(travelers.data.travelers[i]).to.have.all.keys("id", "name", "travelerType");
    }
    for (let i = 0; i < travelers.data.travelers.length; i++) {
      expect(travelers.data.travelers[i]).to.not.have.same.keys("userID", "destinationID", "travelers", "date", "duration", "status", "suggestedActivities");
    }
  })

});
