import chai from 'chai';
const expect = chai.expect;
import { testTrips } from './sample-data/sample-trips';
import { filterTrips, organizeTrips } from '../src/trips';
import { testTravelers } from './sample-data/sample-traveler';
import { setTraveler } from '../src/traveler';

describe('Trips', function() {
  let traveler1, traveler2, trips1;
  beforeEach(() => {
    traveler1 = setTraveler(1, testTravelers);
    traveler2 = setTraveler(2, testTravelers);
    trips1 = filterTrips(traveler1.id, testTrips);
  });
  
  describe('Filter Trips', function() {
    it('should return an array of one traveler\'s trips', function() {
      // const trips1 = filterTrips(traveler1.id, testTrips);

      expect(trips1).to.be.an('array')
      expect(trips1.length).to.equal(3);
      expect(trips1[0]).to.deep.equal({ 
        date: "2023/02/14", 
        destinationID: 1, 
        duration: 6, 
        id: 1, 
        status: "approved", 
        suggestedActivities: [], 
        travelers: 1, 
        userID: 1 
      });
    });
    it.skip('should return an array of another traveler\'s trips', function() {
      const trips2 = filterTrips(traveler2.id, testTrips);

      expect(trips2).to.be.an('array')
      expect(trips2.length).to.equal(3);
      expect(trips2[0]).to.deep.equal({ 
        date: "2023/03/20", 
        destinationID: 2, 
        duration: 5, 
        id: 2, 
        status: "approved", 
        suggestedActivities: [], 
        travelers: 2, 
        userID: 2 
      });
    })
  })

  describe('Organize Trips', function() {
    it.skip('should create an object of a traveler\'s pending and approved trips', function() {
    })
  })
});