import chai from 'chai';
const expect = chai.expect;
import { testTrips } from './sample-data/sample-trips';
import { filterTrips, organizeTrips, calculateTripCost, findCurrentYear, calculateStats, getTripDisplayInfo, createTrip } from '../src/trips';
import { testTravelers } from './sample-data/sample-traveler';
import { setTraveler } from '../src/traveler';
import { testDestinations } from './sample-data/sample-destinations';
import { findDestination, getDestDisplayInfo } from '../src/destinations';

describe('Trips', function() {
  let traveler1, traveler2, traveler3, traveler4, trips1, trips2, trips3, trips4, traveler1Trips, traveler4Trips, trav1DisplayInfo;
  beforeEach(() => {
    traveler1 = setTraveler(1, testTravelers);
    traveler2 = setTraveler(2, testTravelers);
    traveler3 = setTraveler(3, testTravelers);
    traveler4 = setTraveler(4, testTravelers);
    trips1 = filterTrips(traveler1, testTrips);
    trips2 = filterTrips(traveler2, testTrips);
    trips3 = filterTrips(traveler3, testTrips);
    trips4 = filterTrips(traveler4, testTrips);
    traveler1Trips = organizeTrips(trips1);
    traveler4Trips = organizeTrips(trips4);
    trav1DisplayInfo = getTripDisplayInfo(traveler1Trips, testDestinations);
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
      // sad path(s) - if an invalid id is passed
    });
    // it.skip('should sort trips from most recent to earliest', function() {
    //   expect(trips3[0].date).to.equal('2026/06/25')
    // })
  });

  describe('Organize Trips', function() {
    it('should create an object of a traveler\'s pending and approved trips', function() {

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

  describe('Find Current Year', function() {
    it('should return the year of a traveler\'s most recent trip', function() {
      const currentYear = findCurrentYear(trips3);

      expect(currentYear).to.equal('2026')

    });
  });

  describe('Calculate Trip Cost', function() {
    it('should return an object with cost breakdown for one trip', function() {
      const cost1 = calculateTripCost(1, testTrips, testDestinations);

      expect(cost1).to.deep.equal({
        totalLodging: 420,
        totalAirfare: 400,
        subtotal: 820,
        agentFee: 82,
        grandTotal: 902 
      })
    });
    it('should calculate costs for trips with multiple travelers', function() {
      const cost2 = calculateTripCost(2, testTrips, testDestinations);

      expect(cost2).to.deep.equal({
        totalLodging: 225,
        totalAirfare: 1530,
        subtotal: 1755,
        agentFee: 176,
        grandTotal: 1931 
      })
    })
    it('should return "false" if passed an ID of a non-existent trip', function() {
      const invalidCost = calculateTripCost(10, testTrips, testDestinations);

      expect(invalidCost).to.be.false;
    });
    it('should have rounded up integers as property values', function() {
      const roundedCost = calculateTripCost(4, testTrips, testDestinations);

      expect(roundedCost.grandTotal).to.equal(1322);
    });
  });

  describe('Calculate Trip Stats', function() {
    it('should return an object with totals spent for a traveler\'s past trips that year', function() {
      const currentYear = findCurrentYear(trips1);
      const trav1Stats = calculateStats(traveler1Trips, testTrips, testDestinations, currentYear);


      // expect(trav1Stats).to.deep.equal({
      //   lodging: 1220,
      //   airfare: 2200,
      //   subtotal: 3420,
      //   agentFee: 342,
      //   grandTotal: 3762,
      //   tripsTaken: 2
      // });
      expect(currentYear).to.equal('2026')
      expect(trav1Stats).to.deep.equal({
        lodging: 0,
        airfare: 0,
        subtotal: 0,
        agentFee: 0,
        grandTotal: 0,
        tripsTaken: 1,
        year: ''
      });
    });
    it('should return properties with values of 0 if no trips have been approved/taken by the traveler', function() {
      const trav4Stats = calculateStats(traveler4Trips, testTrips, testDestinations);

      expect(trips4.length).to.equal(0);
      expect(trav4Stats).to.deep.equal({
        lodging: 0,
        airfare: 0,
        subtotal: 0,
        agentFee: 0,
        grandTotal: 0,
        tripsTaken: 0,
        year: ''
      });
    });
  });

  describe('Get Trip Display Info', function() {
    it('should return an object with past and pending properties', function() {

      expect(trav1DisplayInfo.past).to.be.an('array');
      expect(trav1DisplayInfo.pending).to.be.an('array');
    });
    it('should include display info for all a traveler\'s past and pending trips', function() {

      expect(trav1DisplayInfo).to.deep.equal({
        past: [{
            name: "Lima, Peru",
            image: "https://images.unsplash.com/photo-1489171084589-9bf89e1baa8b?ixid=MnwyMzU4MzB8MHwxfGFsbHwxfHx8fHx8fHx8fDE2Mzg1ODU0NzE&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80",
            alt: "city with buildings during the day"
          },
          {
            name: "Dubai, UAE",
            image: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixid=MnwyMzU4MzB8MHwxfGFsbHwxfHx8fHx8fHx8fDE2Mzg1ODU0NzE&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80",
            alt: "city with tall buildings and a fountain in the foreground"
          }
        ],
        pending: [{
          name: "Paris, France",
          image: "https://images.unsplash.com/photo-1508818619205-0a3a90aadc5d?ixid=MnwyMzU4MzB8MHwxfGFsbHwxfHx8fHx8fHx8fDE2Mzg1ODU0NzE&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80",
          alt: "city during the day with eiffel tower"
          }
        ]
      });
    });
    it('should provide feedback if no trips to display', function() {
      const trav4DisplayInfo = getTripDisplayInfo(traveler4Trips, testDestinations);

      expect(trav4DisplayInfo.pending).to.equal('No Pending Trips 🌍')
    });
  });

  describe('Create Trip', function() {
    it('should happy and sad paths', function() {
      
    })

  });
});