import React from 'react';
import PropTypes from "prop-types";
import LocationItemLink from './LocationItemLink';

const LocationItems = ({location, records}) => {
    return (
        <article key={location}>
            <h2>{location}</h2>
            <ul className="locationItems">
                {records.map(rec=>{
                    return <LocationItemLink
                        key={rec.link}
                        link={rec.link}
                        title={rec.title} />
                })}
            </ul>
        </article>
    );
};

LocationItems.propTypes = {
    location:PropTypes.string.isRequired,
    records:PropTypes.array.isRequired
};

LocationItems.defaultProps = {
    location:'',
    records:[]
};

export default LocationItems;