import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

const capitalize = (name) => {
    let letters = name.split('');
    letters[0] = letters[0].toUpperCase();
    return letters.join('');
};

class TopHeader extends Component {

    render()
    {
        return (
            <nav id="header">
                <ul>
                    {this.props.sections.map(site=>{
                        return (
                            <li key={site}>
                                <Link to={{
                                    pathname:`/s/${site}`,
                                    state:{section:site}
                                }}>{capitalize(site)}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

TopHeader.propTypes = {
    sections: PropTypes.array.isRequired
};

TopHeader.defaultProps = {
    sections:[]
};

export default TopHeader;