import React, { Component } from 'react';
import './Places.css';
import TripModal from './TripModal';



class Places extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            venueName: null,
            address: null,
            city: null

        }
        this.closeModal = this.closeModal.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleShow(venueName, venueAddress, venueCity) {
        this.setState({
            showModal: true,
            venueName: venueName,
            address: venueAddress,
            city: venueCity
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    render() {

        const list = this.props.venues && this.props.venues.map((venue, i) => {
            return (
                <li key={i} className="placeItem">
                    <span className="righty">
                        <button className="saveButton"
                            onClick={() => this.handleShow(venue.name, venue.location.address, venue.location.city)}> ♥ </button>
                    </span>
                    {venue.name}
                    <div className="clear"></div>
                </li >
            )
        })

        return (
            <div className="places">
                <h2 className="placesHead"> Nearby Places </h2>
                <div className="placeContainer">

                    <ol className="placeList"> {list}</ol>
                    {this.state.showModal && <TripModal
                        showModal={this.state.showModal}
                        venueName={this.state.venueName}
                        closeModal={this.closeModal}
                        category={this.props.category}
                        address={this.state.address}
                        city={this.state.city}
                    />}
                </div>
            </div>
        )
    }
}

export default Places;