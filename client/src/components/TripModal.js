import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, Radio, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import API from "../components/utils/API";

class TripModal extends React.Component {
  state = {
    existingTrip: false,
    tripName: null,
    selectedModal: null
  }
  constructor(props, context) {
    super(props, context);
    this.saveVenueFunction = this.saveVenueFunction.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
    this.changeSelectedModal = this.changeSelectedModal.bind(this);
  }

  componentDidMount() {
    API.getTripNames()
      .then(res => {
        this.setState({
          trips: res.data,
        })
      })
  };

  changeSelectedModal(tripName) {
    this.setState({ selectedModal: tripName })
  }

  handleModalChange(e) {
    this.setState({ tripName: e.target.value })
  }

  setTripName = (tripName) => {
    tripName ? API.getVenueByTripName(tripName).then(res => {
      this.setState({
        venues: res.data,
      })
    }) :
      API.getVenue()
        .then(res => {
          this.setState({
            venues: res.data,
          })
        })
  }

  saveVenueFunction(venueName, category, tripName, venueAddress, venueCity, closeModalFunc) {
    // do some validation on tripName
    console.log(`venue Name: ${venueName} category: ${category} tripName: ${tripName} address: ${venueAddress} city: ${venueCity}`)
    const newVenue = {
      name: venueName,
      category: category,
      tripName: tripName,
      address: venueAddress,
      city: venueCity
    }
    return () => {
      API.saveVenue(newVenue);
      closeModalFunc();
    }
  }
  
  onChangeFx = event => {
    let { value } = event.target;
    this.setState({
      existingTrip: value === "true"
    })
  }

  // Try to capture selected dropdown value here
  handleSelect(eventKey, event) {
    console.log("The name of the trip is: " + eventKey)
  }

  render() {
    const tripNameList = this.state.trips && this.state.trips.map(trip => trip.tripName) || [];
    const uniqTripNameList = tripNameList.filter((tripName, indexOf, originalArray) => originalArray.indexOf(tripName) === indexOf);
    const list = uniqTripNameList.map(tripName => (
      <MenuItem key={tripName} onClick={() => this.changeSelectedModal(tripName)}> {tripName} </MenuItem>
    )
    )

    return (

      <div>
        <Modal show={true} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.venueName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Radio
                name="radioGroup"
                value="false"
                onClick={this.onChangeFx}>
                Add to Existing Trip</Radio>
              <Radio
                name="radioGroup"
                value="true"
                onClick={this.onChangeFx}>
                Save as New Trip</Radio>
            </FormGroup>
            <div>
              {this.state.existingTrip ? (
                <div>
                  <FormGroup controlId="new_trip">
                    <ControlLabel>Save Trip: </ControlLabel>
                    <input id="trip-input" onChange={this.handleModalChange} type="text" tripname="tripName" placeholder="Trip Name" ></input>
                  </FormGroup>
                  <hr />
                </div>
              )
                :
                (
                  <div>
                    <ControlLabel>Save to Existing Trip: </ControlLabel>
                    <ButtonToolbar>
                      <DropdownButton title="My Trips" id="dropdown-size-medium" onSelect={function (evt) { console.log(evt) }}>
                        {list}
                      </DropdownButton>
                    </ButtonToolbar>
                    {this.state.selectedModal ? <p>Saving to: {this.state.selectedModal} </p> : null}
                    {/* To do: Get name of trip & tie to trip */}
                  </div>
                )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.saveVenueFunction(
              this.props.venueName,
              this.props.category,
              this.state.selectedModal ? this.state.selectedModal : this.state.tripName,
              this.props.address,
              this.props.city,
              this.props.closeModal,
            )}>Save</Button>
            <Button onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default TripModal;
