import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips.js';
import Traveler from '../src/Traveler.js';
import Destinations from '../src/Destinations.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler, destinationsTestData} from '../src/testData';
describe('Trips', () => {

  let trips;
  let traveler1;
  let notTraveler;
  let destinations1;

  beforeEach(() => {
    trips = new Trips(tripsTestData);
    traveler1 = new Traveler(oneTraveler);
    notTraveler = new Traveler({id: 0, name: 'Nobody', travelerType: 'Nobody'});
    destinations1 = new Destinations(destinationsTestData);
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
    for (let i = 0; i < trips.data.trips.length; i++) {
      expect(trips.data.trips[i]).to.have.all.keys("id", "userID", "destinationID", "travelers", "date", "duration", "status", "suggestedActivities");
    }
    for (let i = 0; i < trips.data.trips.length; i++) {
      expect(trips.data.trips[i]).to.not.have.same.keys("name", "travelerType");
    }
  });

  // it('should have a method for converting a date string (Ex: 2021/01/01) to a UTC date', () => {
  //   expect(trips.dateConversion('2021/01/01')).to.equal(`Mon, 01 Feb 2021 07:00:00 GMT`);
  // });

  it('should have a method for pulling all of the user\'s trips', () => {
    expect(trips.retrieveAllTrips(traveler1)).to.deep.equal([
      {"id":1,"userID":1,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":4,"userID":1,"destinationID":14,"travelers":2,"date":"2022/02/25","duration":10,"status":"approved","suggestedActivities":[]},
      {"id":5,"userID":1,"destinationID":50,"travelers":1,"date":"2022/09/16","duration":8,"status":"pending","suggestedActivities":[]}
    ]);
    expect(trips.retrieveAllTrips(notTraveler)).to.deep.equal('No Trip data available.');
  });

  it('should have a method for pulling the user\'s past trips', () => {
    expect(trips.retrievePastTrips(traveler1, '2022/03/05')).to.deep.equal([
      {"id":4,"userID":1,"destinationID":14,"travelers":2,"date":"2022/02/25","duration":10,"status":"approved","suggestedActivities":[]}
    ]);
  });

  it('should have a method for pulling the user\'s future trips', () => {
    expect(trips.retrieveFutureTrips(traveler1, '2022/03/05')).to.deep.equal([
      {"id":1,"userID":1,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":5,"userID":1,"destinationID":50,"travelers":1,"date":"2022/09/16","duration":8,"status":"pending","suggestedActivities":[]}
    ]);
  });

  it('should have a method for pulling the user\'s pending trips', () => {
    expect(trips.retrievePendingTrips(traveler1, '2022/03/05')).to.deep.equal([
      {"id":5,"userID":1,"destinationID":50,"travelers":1,"date":"2022/09/16","duration":8,"status":"pending","suggestedActivities":[]}
    ]);
  });

  it('should have a method for pulling the user\'s present trips', () => {
    expect(trips.retrievePresentTrips(traveler1, '2022/02/25')).to.deep.equal([
      {"id":4,"userID":1,"destinationID":14,"travelers":2,"date":"2022/02/25","duration":10,"status":"approved","suggestedActivities":[]}
    ]);
  });

  // retrievePresentAndFutureTrips()

  it('should have a method for pulling the user\'s present and future trips, together', () => {
    expect(trips.retrieveTripsFromNow(traveler1, '2022/03/05')).to.deep.equal([
      {"id":1,"userID":1,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":5,"userID":1,"destinationID":50,"travelers":1,"date":"2022/09/16","duration":8,"status":"pending","suggestedActivities":[]}
    ]);
  });

  it('should have a method for pulling the user\'s trips between dates', () => {
    expect(trips.retrieveTripsBetweenDates(traveler1, '2022/09/15', '2022/09/17')).to.deep.equal([
      {"id":1,"userID":1,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":5,"userID":1,"destinationID":50,"travelers":1,"date":"2022/09/16","duration":8,"status":"pending","suggestedActivities":[]}
    ]);
  });

  // it('should have a method for getting todays\'s date', () => {
  //   expect(trips.getTodayDate()).to.equal('2022/03/06');
  // });  <----- This test is commented out because it always fails once the date changes.

  it('should have a method for getting the date of the beginning of the year', () => {
    expect(trips.getYearBeginDate()).to.equal('2022/01/01');
  });

  it('should have a method for getting the date of the end of the year', () => {
    expect(trips.getYearEndDate()).to.equal('2022/12/12');
  });

  it('should have a method for pulling the user\'s total spent on trips in the current year', () => {
    expect(trips.getTotalSpent(traveler1, destinations1)).to.equal(2050);
  });

});
