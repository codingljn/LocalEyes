import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './CitySearch.css';

const CitySearch = (props) => {
    return (
        <div className="cityContainer">
            <form className="citySearch" onSubmit={props.citySearchSubmit}>
                <FormGroup controlId="CitySearch">
                    <ControlLabel>Take Me To: </ControlLabel>
                    <FormControl
                        type="text"
                        value={props.citySearch}
                        placeholder="Enter City"
                        onChange={props.onHandleChange}
                    />
                </FormGroup>
            </form>
        </div>
    )
}
export default CitySearch;