import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/index';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Regions from './Regions';
import Areas from './Areas';
import PropTypes from "prop-types";
import FormField from './FormField';

class Navigation extends Component {

    state = {
        form:{}
    };

    constructor() {
        super();
    }

    submitForm = (e) => {
        e.preventDefault();
        const { dispatch, site, area_list, region_list } = this.props;
        const {form} = this.state;
        dispatch(actions.location.submitSearch({
            data:form,
            site,
            area_list,
            region_list
        }))
    };

    onTextChangeDeBounce = debounce(({elm, key}) => {
        this.setState(Object.assign({}, {
            form:{
                ...this.state.form,
                [key]:elm.target.value
            }
        }));
    }, 50);

    onRadioChangeDeBounce = debounce(({elm, key}) => {
        this.setState(Object.assign({}, {
            form:{
                ...this.state.form,
                [key]:elm.target.value
            }
        }));
    }, 50);

    onCheckBoxChangeDeBounce = debounce(({elm, key}) => {
        this.setState(Object.assign({}, {
            form:{
                ...this.state.form,
                [key]:elm.target.checked
            }
        }));
    }, 50);

    onTextChange = ({elm, key}) =>{
        elm.persist();
        this.onTextChangeDeBounce({elm, key});
    };

    onRadioChange = ({elm, key}) =>{
        elm.persist();
        this.onRadioChangeDeBounce({elm, key});
    };

    onCheckBoxChange = ({elm, key}) =>{
        elm.persist();
        this.onCheckBoxChangeDeBounce({elm, key});
    };

    componentWillMount()
    {
        // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
        const {dispatch, history} = this.props;

        if(history.location.state)
            dispatch(actions.search.fetchSearchSettings(history.location.state.section));

        history.listen(() => {
            let  {state} = history.location;
            // view new URL
            console.log('New URL', history.location);
            dispatch(actions.search.fetchSearchSettings(state.section));
        });
    }

    render()
    {
        if(!this.props.loaded && !this.props.loading)
            return null;

        if(this.props.loading)
            return (<div>Loading...</div>);

        return (
            <form onSubmit={this.submitForm} id="find_items">
                <div id="change_size_container">
                    <div>{this.props.page_title}</div>
                    {Object.entries(this.props.fields).map(([key, field])=>{
                        return (
                            <FormField
                                key={field.argName}
                                field={field}
                                state={this.state}
                                onTextChange={this.onTextChange}
                                onRadioChange={this.onRadioChange}
                                onCheckBoxChange={this.onCheckBoxChange}
                            />
                        );
                    })}
                </div>
                <cite>{this.props.page_search_example}</cite>
                <div id="locations_container">
                    <Regions />
                    <Areas />
                </div>
                <button id="search_btn" type="submit">Search</button>
            </form>
        );
    }
}

Navigation.propTypes = {
    page_title: PropTypes.string.isRequired,
    site: PropTypes.string.isRequired,
    page_search_example: PropTypes.string.isRequired,
    area_list: PropTypes.object.isRequired,
    region_list: PropTypes.object.isRequired,
};

Navigation.defaultProps = {
    page_title:'',
    site:'',
    page_search_example:'',
    area_list:{},
    region_list:{}
};

const mapStateToProps = state => state.search_settings;
export default withRouter(connect(mapStateToProps)(Navigation));