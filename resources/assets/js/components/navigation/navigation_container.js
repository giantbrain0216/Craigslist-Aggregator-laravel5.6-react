import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';
import Navigation from './navigation_component';
import actions from "../../actions";

class NavigationContainer extends Component {

    constructor(){
        super();
    }

    componentWillMount()
    {
        // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
        const {history} = this.props;

        if(history.location.state)
            this.props.fetchSearchSettings(history.location.state.section);

        history.listen(() => {
            let  {state} = history.location;
            // view new URL
            console.log('New URL', history.location);
            this.props.fetchSearchSettings(state.section);
        });
    }

    render()
    {
        return <Navigation {...this.props}/>
    }
}

const mapStateToProps = state => state.search_settings;

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSubmitForm: (e)=> (_, getState) =>{
        e.preventDefault();
        const state = getState();
        const {form, site, area_list, region_list} = state.search_settings;
        console.log('state', area_list, region_list);
        dispatch(actions.location.submitSearch({
            data:form,
            site,
            area_list,
            region_list
        }))
    },
    fetchSearchSettings: (section) => () => {
        dispatch(actions.search.fetchSearchSettings(section));
    },
    onFormUpdateField: ({key, value}) => () => {
        dispatch(actions.search.updateFormFields({key, value}));
    },
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationContainer));