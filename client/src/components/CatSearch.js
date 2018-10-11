import React from 'react';
import { Button } from 'react-bootstrap';

const buttonHandler = (url, updateVenueFunc, updateCategory, title) => {
    return () => {
        updateCategory(title);
        updateVenueFunc(url);
    }
}

const CatSearch = ({ title, url, updateVenueFunc, updateCategory }) => {
    return (
        <Button onClick={buttonHandler(url, updateVenueFunc, updateCategory, title)}>
            {title}
        </Button>
    )
} 

export default CatSearch;