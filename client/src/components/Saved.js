import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { VoteUpDown } from './Voting';
import API from "./utils/API";
import './Saved.css';

class Saved extends Component {
    constructor(props) {
        super(props);
        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            venues: [],
            collapse: false, status: 'Closed',
            tripName: null
        }
    }

    onEntering() {
        this.setState({ status: 'Opening...' });
    }

    onEntered() {
        this.setState({ status: 'Opened' });
    }

    onExiting() {
        this.setState({ status: 'Closing...' });
    }

    onExited() {
        this.setState({ status: 'Closed' });
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        this.setTripName();

    };

    setVenues = () => {
        API.getVenue()
            .then(res => {
                this.setState({
                    venues: res.data,
                })
            })
        API.getTripNames()
            .then(res => {
                this.setState({
                    trips: res.data,
                })
            })
    }

    // Adding dynamic trip names
    setTripName = (tripName) => {
        API.getTripNames()
            .then(res => {
                this.setState({
                    trips: res.data,
                })
            });
        tripName ? API.getVenueByTripName(tripName).then(res => {
            console.log(res);
            this.setState({
                venues: res.data,
            })
        })
            :
            API.getVenue()
                .then(res => {
                    this.setState({
                        venues: res.data,
                    })
                })

    }

    deleteVenueButton = (venue) => {
        API.deleteVenue(venue);
        window.location.reload();
    }

    render() {
        const tripNameList = this.state.trips && this.state.trips.map(trip => trip.tripName) || [];
        const uniqTripNameList = tripNameList.filter((tripName, indexOf, originalArray) => originalArray.indexOf(tripName) === indexOf);
        const list = uniqTripNameList.map(tripName => (
            <Button key={tripName} color="primary" className="tripButton" onClick={() => {
                this.setTripName(tripName)
                this.toggle()
            }} > {tripName} </Button>
        )
        )
        
        const attractionsVenuesList = this.state.venues && this.state.venues.map((venue, i) => {
            if (venue.category === 'Attractions'
            ) {
                return (
                    <p key={i}>
                    <hr />
                        <p><button className="deleteButton" onClick={() => this.deleteVenueButton(venue.id)}> ✗ </button></p>
                        <p className= "venueName">{venue.name}</p>
                        <p className="info">{venue.address}, {venue.city} </p>
                        <VoteUpDown />
                    </p>
                )
            }
            return null
        })
        const foodVenuesList = this.state.venues && this.state.venues.map((venue, i) => {
            if (venue.category === 'Food') {
                return (
                    <p key={i}>
                        <p><button className="deleteButton" onClick={() => this.deleteVenueButton(venue.id)}> ✗ </button></p>
                        <p className= "venueName">{venue.name}</p>
                        <p className="info">{venue.address}, {venue.city} </p>
                        <VoteUpDown />
                        <br />
                    </p>
                )
            }
            return null
        })
        const hotelsVenuesList = this.state.venues && this.state.venues.map((venue, i) => {
            if (venue.category === 'Hotels') {
                return (
                    <p key={i}>
                        <p><button className="deleteButton" onClick={() => this.deleteVenueButton(venue.id)}> ✗ </button></p>
                        <p className= "venueName">{venue.name}</p>
                        <p className="info">{venue.address}, {venue.city} </p>
                        <VoteUpDown />
                    </p>
                )
            }
            return null
        })
        const eventsVenuesList = this.state.venues && this.state.venues.map((venue, i) => {
            if (venue.category === 'Events') {
                return (
                    <p key={i}>
                        <p className= "venueName">{venue.name}</p>
                        <p><button className="deleteButton" onClick={() => this.deleteVenueButton(venue.id)}> ✗ </button></p>
                        <p className="info">{venue.address}, {venue.city} </p>
                        <VoteUpDown />
                    </p >
                )
            }
            return null
        })

        return (
            <div >
                {list}
                <hr />

                <Collapse
                    isOpen={this.state.collapse}
                    onEntering={this.onEntering}
                    onEntered={this.onEntered}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <Card>
                        <CardBody>
                            <ul>
                                <div>
                                    <h2 className="categoryTitle">Food</h2>
                                    <br />
                                    {foodVenuesList}
                                </div>
                                <div>
                                    <h2 className="categoryTitle">Attractions</h2>
                                    <br />
                                    {attractionsVenuesList}
                                </div>
                                <div>
                                    <h2 className="categoryTitle">Hotels</h2 >
                                    <br />
                                    {hotelsVenuesList}
                                </div>
                                <div>
                                    <h2 className="categoryTitle">Events</h2>
                                    <br />
                                    {eventsVenuesList}
                                </div>
                            </ul>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}



export default Saved;