import React, { Component } from 'react';
import PropTypes from "prop-types";
import LocationsByDate from './LocationsByDate';

class Content extends Component {
    constructor()
    {
        super();
    }

    render()
    {
        if(this.props.loading)
        {
            return (
                <div id="content-container">
                    <div id="link_content">{'...Loading'}</div>
                </div>
            );
        }

        return (
            <div id="content-container">
                <div id="link_content">
                    {this.props.search_data.map(dates=>{
                        return (<LocationsByDate key={dates.timestamp} dates={dates} />);
                    })}
                </div>
            </div>
        );
    }
}

Content.propTypes = {
    loading: PropTypes.bool.isRequired,
    search_data: PropTypes.array.isRequired
};

Content.defaultProps = {
    loading:true,
    search_data:[]
};

export default Content;