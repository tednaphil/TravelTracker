import chai from 'chai';
const expect = chai.expect;
import { testDestinations } from './sample-data/sample-destinations';
import { findDestination, getDestinationCosts, filterDestinations, getDestDisplayInfo } from '../src/destinations';
import { testTrips } from './sample-data/sample-trips';
import { filterTrips, organizeTrips } from '../src/trips';
import { testTravelers } from './sample-data/sample-traveler';
import { setTraveler } from '../src/traveler';



describe('Destinations', function() {
  let traveler1, traveler2, traveler3, trips1, trips2, trips3, traveler1Trips, dest1;
  beforeEach(() => {
    traveler1 = setTraveler(1, testTravelers);
    traveler2 = setTraveler(2, testTravelers);
    traveler3 = setTraveler(3, testTravelers);
    trips1 = filterTrips(traveler1, testTrips);
    trips2 = filterTrips(traveler2, testTrips);
    trips3 = filterTrips(traveler3, testTrips);
    traveler1Trips= organizeTrips(trips1);
    dest1 = findDestination(1, testDestinations);
  });

  describe('Find Destination', function() {
    it('should return one destination object based on ID', function() {

      expect(dest1).to.deep.equal({
        id: 1,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image:
          "https://images.unsplash.com/photo-1489171084589-9bf89e1baa8b?ixid=MnwyMzU4MzB8MHwxfGFsbHwxfHx8fHx8fHx8fDE2Mzg1ODU0NzE&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80",
        alt: "city with buildings during the day",
      });
    });
    it('should return "false" if passed an ID of a non-existent destination', function() {
      const invalidDest = findDestination(10, testDestinations);

      expect(invalidDest).to.be.false;
    });
  });

  describe('Get Destination Costs', function() {
    it.skip('should')
  });

  describe('Get Destination Display Info', function() {
    it('should return an object with one destination\'s details to display', function() {
      const destInfo = getDestDisplayInfo(dest1);

      expect(destInfo).to.be.an('object');
      expect(destInfo.name).to.equal("Lima, Peru");
      expect(destInfo.image).to.equal("https://images.unsplash.com/photo-1489171084589-9bf89e1baa8b?ixid=MnwyMzU4MzB8MHwxfGFsbHwxfHx8fHx8fHx8fDE2Mzg1ODU0NzE&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80");
      expect(destInfo.alt).to.equal("city with buildings during the day");
    });
    // sad path(s)
  });

  // describe('Filter Destinations', function() {
  //   it('should return an array of destination objects based on submitted input', function() {

  //   });
  // });
});