import chai from 'chai';
const expect = chai.expect;
import { testTravelers } from './sample-data/sample-traveler';
import { setTraveler } from '../src/traveler';


describe('Traveler', function() {
  // let traveler1, traveler2, traveler3, invalidTraveler;
  // this.beforeEach(() => {
  //   traveler1 = setTraveler(1, testTravelers);
  //   traveler2 = setTraveler(2, testTravelers);
  //   traveler3 = setTraveler(3, testTravelers);
  //   invalidTraveler = setTraveler(99);
  // })

  describe('Set Traveler', function() {
    it('should return one traveler based on ID', function() {
      const traveler1 = setTraveler(1, testTravelers);
      
      expect(traveler1.id).to.equal(1);
      expect(traveler1.name).to.equal('Elena Nguyen');
      expect(traveler1.travelerType).to.equal('relaxer');
    });
    it('should return a different traveler based on a different ID', function() {
      const traveler2 = setTraveler(2, testTravelers);

      expect(traveler2.id).to.equal(2);
      expect(traveler2.name).to.equal('Kai Miller');
      expect(traveler2.travelerType).to.equal('thrill-seeker');
    });
    it.skip('should return false if passed an ID of a non-existent traveler', function() {

      expect(invalidTraveler).to.be.false
    });
  });
});