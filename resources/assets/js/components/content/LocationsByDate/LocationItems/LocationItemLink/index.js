import React from 'react';
import PropTypes from "prop-types";

const LocationItemLink = ({title, link}) =>{
    return (
        <li>
            <a title={title}
               target="_blank"
               href={link}>
                <span dangerouslySetInnerHTML={{__html:title}} />
            </a>
        </li>
    );
};

LocationItemLink.propTypes = {
    title:PropTypes.string.isRequired,
    link:PropTypes.string.isRequired,
};

LocationItemLink.defaultProps = {
    title:'',
    link:'',
};

export default LocationItemLink;