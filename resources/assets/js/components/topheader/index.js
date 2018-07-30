import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

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
const mapStateToProps = state => state.search_settings;

export default withRouter(connect(mapStateToProps)(TopHeader));