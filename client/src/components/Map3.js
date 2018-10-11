import React, { Component } from 'react';
import './Map.css';
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps';

class Map extends Component {
    constructor() {
        super()
        this.state = {
            showInfoIndex: 0,
            map: null
        }
        this.handleToggle = this.handleToggle.bind(this);
    }

    showInfo(i) {
        this.setState({ showInfoIndex: i })
    }

    handleToggle = () => {
        this.setState({
            isOpen: true
        });
    }
    // new

    mapMoved() {
        console.log('map moved ' + JSON.stringify(this.state.map.getCenter()))
    }

    zoomChanged() {
    }

    mapLoaded(map) {
        if (this.state.map != null)
            return

        this.setState({
            map: map
        })
    }

    onMarkerClick(venue) {
    }

    render() {

        const markers = this.props.markers && this.props.markers.map((venue, i) => {
            const marker = {
                position: {
                    lat: venue.location.lat,
                    lng: venue.location.lng,
                },
                name: {
                    name: venue.name
                }
            }
            return <Marker
                key={i} {...marker} defaultClickable
                position={marker.position}
                onClick={() => { this.showInfo(i) }}>
                {
                    (this.state.showInfoIndex === i) && <InfoWindow onCloseClick={this.onToggleOpen}>
                        <span>{venue.name}</span>
                    </InfoWindow>
                }
            </Marker>
        })

        return (
            <GoogleMap
                ref={this.mapLoaded.bind(this)}
                onDragEnd={this.mapMoved.bind(this)}
                onZoomChanged={this.zoomChanged.bind(this)}
                defaultZoom={12}
                center={this.props.center}>
                {/* The below markers is the one feeding marker data */}
                {markers}
            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(Map));