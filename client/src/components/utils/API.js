import axios from "axios";

export default {

  saveVenue: function(venues) {
    return axios.post("/api/savedVenues", venues)
  },

  getVenue: function() {
    return axios.get("/api/savedVenues")
  },

  getVenueByCategory: function(category){
    return axios.get("/api/savedVenues/" + category )
  },

  getVenueByTripName: function(tripName){
    return axios.get("/api/savedVenuesTest/" + tripName )
  },

  deleteVenue: function(id) {
    return axios.delete("/api/deleteVenue/" + id);
  },

  getTripNames: function(tripNames){
    return axios.get("/api/savedVenues/tripNames/")
  }

};