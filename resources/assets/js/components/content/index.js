import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Content extends Component {
    constructor()
    {
        super();
    }

    render(){
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
                        return (
                            <section>
                                <h1>{dates.date}</h1>
                                <div className="date">
                                    {dates.records.map((records, location)=>{
                                        return (
                                            <article key={location}>
                                                <h2>{location}</h2>
                                                <ul className="locationItems">
                                                    {records.map(rec=>{
                                                        return (
                                                            <li key={rec.link}>
                                                                <a className="jobsite"
                                                                   title={rec.title}
                                                                   target="_blank"
                                                                   href={rec.link}>
                                                                    <span>{rec.title}</span>
                                                                </a>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </article>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state.locations;
export default withRouter(connect(mapStateToProps)(Content));