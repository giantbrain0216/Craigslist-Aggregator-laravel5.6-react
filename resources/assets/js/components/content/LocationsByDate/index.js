import React from 'react';
import PropTypes from "prop-types";
import LocationItems from './LocationItems';

const LocationsByDate = ({dates}) => {
    return (
        <section key={dates.date}>
            <h1>{dates.date}</h1>
            <div className="date">
                {Object.entries(dates.records).map(([location, records])=>{
                    return (
                        <LocationItems
                            key={location}
                            location={location}
                            records={records} />
                    )
                })}
            </div>
        </section>
    );
};

LocationsByDate.propTypes = {
    dates:PropTypes.shape({
        date:PropTypes.string.isRequired,
        records:PropTypes.object.isRequired,
    })
};

LocationsByDate.defaultProps = {
    dates:{
        date:'',
        records:{}
    }
};

export default LocationsByDate;