import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler.js';
import {tripsTestData, oneTrip, travelersTestData, oneTraveler} from '../src/testData.js';

describe('Traveler', () => {

  let exampleVar;

  beforeEach(() => {
    exampleVar = "Test";
  })

  it('should return true', () => {
    expect(true).to.equal(true);
    console.log(exampleVar);
  });

  it('should return true', () => {
    expect(true).to.equal(true);
    console.log(exampleVar);
  });

});
