import chai from 'chai';
const expect = chai.expect;
import { testTrips } from './sample-data/sample-trips';
import { filterTrips } from '../src/trips';
import { testTravelers } from './sample-data/sample-traveler';
import { setTraveler } from '../src/traveler';

describe('Trips', function() {
  // it('should return true', function() {
  //   expect(true).to.equal(true);
  // });
  let traveler1, traveler2;
  beforeEach(() => {
    traveler1 = setTraveler(1, testTravelers);
    traveler2 = setTraveler(2, testTravelers);
  })
  console.log(traveler1)//why undefined? check imports
  
  describe('Filter Trips', function() {
    it.skip('should return an array of one traveler\'s trips')
    // const trips1 = filterTrips(traveler1.id, testTrips);

    // expect(trips1.length).to.equal(3)
  })
});