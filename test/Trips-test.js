import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips.js';
import Traveler from '../src/Traveler.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler} from '../src/testData';

describe('Trips', () => {

  let trips;
  let traveler;
  let notTraveler;

  beforeEach(() => {
    trips = new Trips(tripsTestData);
    traveler = new Traveler(oneTraveler);
    notTraveler = new Traveler({id: 0, name: 'Nobody', travelerType: 'Nobody'});
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

  // it('should have a method for converting a date string (Ex: 2021/01/01) to a UTC date', () => {
  //   expect(trips.dateConversion('2021/01/01')).to.equal(`Mon, 01 Feb 2021 07:00:00 GMT`);
  // });

  it('should have a method for pulling all of the user\'s trips', () => {
    expect(trips.retrieveAllTrips(traveler.id)).to.deep.equal([
      {"id":1,"userID":1,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":4,"userID":1,"destinationID":14,"travelers":2,"date":"2022/02/25","duration":10,"status":"approved","suggestedActivities":[]}
    ]);
    expect(trips.retrieveAllTrips(notTraveler.id)).to.deep.equal('No Trip data available.');
  });

  it('should have a method for pulling the user\'s past trips', () => {
    trips.dateConversion('2021/03/05');
    // expect(trips.retrieveAllTrips(traveler.id, '2021/03/05')).to.deep.equal([
    //   {"id":1,"userID":1,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]}
    // ]);
    // expect(trips.retrieveAllTrips(notTraveler.id)).to.deep.equal('No Trip data available.');
  });

});
