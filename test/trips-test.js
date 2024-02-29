import chai from 'chai';
const expect = chai.expect;
import { testTrips } from './sample-data/sample-trips';
import { filterTrips, organizeTrips, calculateTripCost, createTrip } from '../src/trips';
import { testTravelers } from './sample-data/sample-traveler';
import { setTraveler } from '../src/traveler';
import { testDestinations } from './sample-data/sample-destinations';
import { findDestination } from '../src/destinations';

describe('Trips', function() {
  let traveler1, traveler2, traveler3, trips1, trips2, trips3;
  beforeEach(() => {
    traveler1 = setTraveler(1, testTravelers);
    traveler2 = setTraveler(2, testTravelers);
    traveler3 = setTraveler(3, testTravelers);
    trips1 = filterTrips(traveler1.id, testTrips);
    trips2 = filterTrips(traveler2.id, testTrips);
    trips3 = filterTrips(traveler3.id, testTrips);
  });
  
  describe('Filter Trips', function() {
    it('should return an array of one traveler\'s trips', function() {

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
    it('should return an array of another traveler\'s trips', function() {

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
      // sad path(s)
    })
  });

  describe('Organize Trips', function() {
    it('should create an object of a traveler\'s pending and approved trips', function() {
      const traveler1Trips = organizeTrips(trips1)

      expect(traveler1Trips).to.deep.equal({
        approved: [{ 
          date: "2023/02/14", 
          destinationID: 1, 
          duration: 6, 
          id: 1, 
          status: "approved", 
          suggestedActivities: [], 
          travelers: 1, 
          userID: 1 
        },
        { 
          date: "2026/04/10", 
          destinationID: 7, 
          duration: 4, 
          id: 7, 
          status: "approved", 
          suggestedActivities: [], 
          travelers: 2, 
          userID: 1 
        }
      ],
        pending: [{ 
          date: "2025/01/10", 
          destinationID: 4, 
          duration: 4, 
          id: 4, 
          status: "pending", 
          suggestedActivities: [], 
          travelers: 2, 
          userID: 1 
        }]
      });
    });
    it('should present an empty array if no trips match the respective status', function() {
      const traveler3Trips = organizeTrips(trips3);

      expect(traveler3Trips.pending).to.deep.equal([])
    })
  });

  describe('Calculate Trip Cost', function() {
    it.skip('should return an object with cost breakdown for one trip', function() {
      const cost1 = calculateTripCost(1, testTrips, testDestinations);

      expect(cost1).to.deep.equal({
        totalLodging: 420,
        totalAirfare: 400,
        subtotal: 820,
        agentFee: 82,
        grandTotal: 902 
      })
    });
    it.skip('should calculate costs for trips with multiple travelers', function() {
      const cost2 = calculateTripCost(2, testTrips, testDestinations);

      expect(cost2).to.deep.equal({
        totalLodging: 225,
        totalAirfare: 1530,
        subtotal: 1755,
        agentFee: 175.5,
        grandTotal: 1931 
      })
    })
    it.skip('should return "false" if passed an ID of a non-existent trip', function() {
      const invalidCost = calculateTripCost(10, testTrips, testDestinations);

      expect(invalidCost).to.be.false;
    });
    it.skip('should have rounded up integers as property values', function() {
      const roundedCost = calculateTripCost(4, testTrips, testDestinations);

      expect(roundedCost.grandTotal).to.equal(1322);
    });
  });

  describe('Create Trip', function() {

  });
});