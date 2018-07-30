import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const LocationItemLink = ({title, link}) =>{
    return (
        <li key={link}>
            <a className="jobsite"
               title={title}
               target="_blank"
               href={link}>
                <span>{title}</span>
            </a>
        </li>
    );
};

const LocationItems = ({location, records}) => {
    return (
        <article key={location}>
            <h2>{location}</h2>
            <ul className="locationItems">
                {records.map(rec=>{
                    return <LocationItemLink link={rec.link} title={rec.title} />
                })}
            </ul>
        </article>
    );
};

const LocationsByDate = ({dates}) => {
    return (
        <section key={dates.date}>
            <h1>{dates.date}</h1>
            <div className="date">
                {dates.records.map((records, location)=>{
                    return (
                        <LocationItems location={location} records={records} />
                    )
                })}
            </div>
        </section>
    );
};

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
                        return (<LocationsByDate dates={dates} />);
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state.locations;
export default withRouter(connect(mapStateToProps)(Content));