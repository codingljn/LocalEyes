import React, { Component } from 'react';
import Map3 from './Map3';
import Places from './Places';
import superagent from 'superagent'
import CitySearch from './CitySearch'
import CatSearch from './CatSearch';
import { ButtonToolbar } from 'react-bootstrap';
const db = require('dotenv');

class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      venues: [],
      currentLocation: "",
      currentLatAndLong: {
        lat: 41.4993,
        lng: -81.6944
      },
      currentCategory: "Food",
    }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.citySearchSubmit = this.citySearchSubmit.bind(this);
  }

  componentDidMount() {
  }

  setCategory = (category) => {
    this.setState({
      currentCategory: category,
    })
  }

  searchFoursquare = (url) => {
    superagent
      .get(url)
      .query(null)
      .set('Accept', 'text/json')
      .end((error, response) => {
        const venues = response.body.response.venues
        const addresses = [];
        const cities = [];
        this.setState({
          venues: venues,
          addresses: addresses,
          cities: cities
        })
      })
  }

  citySearchSubmit(event) {
    event.preventDefault();
    this.setState({
      currentLatAndLong: this.determineLatAndLong(this.state.currentLocation)
    })
    this.searchFoursquare(`https://api.foursquare.com/v2/venues/search?near=${this.state.currentLocation}&categoryId=4d4b7105d754a06374d81259&client_id=4VTWQWINQJUKL0X4PV52BG0ZUO0E25R1HUKSLKSXZP10TR3H&client_secret=J2SSZO4RLIG1J2IZ10D3IBF1VDC2QQYDJTPCNLXJGOHWSK1U&v=20180923`)
  }

  determineLatAndLong(city) {
    const gurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.currentLocation}&key=AIzaSyAZ73W29ubLVV9YoW1dsMyob-ZlEiZWoPs`

    superagent
      .get(gurl)
      .query(null)
      .set('Accept', 'text/json')
      .end((error, response) => {
        const lat = response.body.results[0].geometry.location
        this.setState({
          currentLatAndLong: lat
        })
      })
  }

  onHandleChange(event) {
    const city = event.target.value
    this.setState({
      currentLocation: city
    })
  }

  render() {
    return (
      <div className="App">

        {/* <header className="App-header"></header> */}
        <p className="App-intro"></p>
        <CitySearch
          onHandleChange={this.onHandleChange}
          citySearch={this.state.currentLocation}
          citySearchSubmit={this.citySearchSubmit}
        />

        <div className="mapContainer">
          <ButtonToolbar>
            <CatSearch
              updateCategory={this.setCategory}
              title='Hotels'
              url={`https://api.foursquare.com/v2/venues/search?near=${this.state.currentLocation}&categoryId=4bf58dd8d48988d1fa931735&client_id=4VTWQWINQJUKL0X4PV52BG0ZUO0E25R1HUKSLKSXZP10TR3H&client_secret=J2SSZO4RLIG1J2IZ10D3IBF1VDC2QQYDJTPCNLXJGOHWSK1U&v=20180923`}
              updateVenueFunc={this.searchFoursquare}
            />
            <CatSearch
              updateCategory={this.setCategory}
              title='Food'
              url={`https://api.foursquare.com/v2/venues/search?near=${this.state.currentLocation}&categoryId=4d4b7105d754a06374d81259&client_id=4VTWQWINQJUKL0X4PV52BG0ZUO0E25R1HUKSLKSXZP10TR3H&client_secret=J2SSZO4RLIG1J2IZ10D3IBF1VDC2QQYDJTPCNLXJGOHWSK1U&v=20180923`}
              updateVenueFunc={this.searchFoursquare}
            />
            <CatSearch
              updateCategory={this.setCategory}
              title='Attractions'
              url={`https://api.foursquare.com/v2/venues/search?near=${this.state.currentLocation}&categoryId=4d4b7104d754a06370d81259&client_id=4VTWQWINQJUKL0X4PV52BG0ZUO0E25R1HUKSLKSXZP10TR3H&client_secret=J2SSZO4RLIG1J2IZ10D3IBF1VDC2QQYDJTPCNLXJGOHWSK1U&v=20180923`}
              updateVenueFunc={this.searchFoursquare}
            />
            <CatSearch
              title='Events'
              updateCategory={this.setCategory}
              url={`https://api.foursquare.com/v2/venues/search?near=${this.state.currentLocation}&categoryId=4d4b7105d754a06373d81259&client_id=4VTWQWINQJUKL0X4PV52BG0ZUO0E25R1HUKSLKSXZP10TR3H&client_secret=J2SSZO4RLIG1J2IZ10D3IBF1VDC2QQYDJTPCNLXJGOHWSK1U&v=20180923`}
              updateVenueFunc={this.searchFoursquare}
            />
          </ButtonToolbar>
          {/* Div to hold Map below */}
          <div className="mapDisplay">
            {/* <div style={{ width: 900, height: 600, background: 'red' }}> */}
            <Map3 center={this.state.currentLatAndLong}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              markers={this.state.venues}
              containerElement={<div style={{ height: 100 + '%' }} />}
              mapElement={<div style={{ height: 100 + '%' }} />} />
          </div>
          </div>
          <Places
            category={this.state.currentCategory}
            city={this.state.cities}
            venues={this.state.venues}
            address={this.state.addresses} />
        </div>
        );
      }
    }
export default MapContainer;