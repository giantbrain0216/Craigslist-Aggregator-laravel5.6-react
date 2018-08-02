import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/index';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import {TextField} from './TextField';
import {RadioFields} from './RadioFields';
import {CheckBoxField} from './CheckBoxField';
import Regions from './Regions';
import Areas from './Areas';
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
                    {Object.keys(this.props.fields).map(fieldKey=>{
                        let field = this.props.fields[fieldKey];
                        switch(field.argType)
                        {
                            case 'text':
                                return (
                                    <TextField
                                        key={field.argName}
                                        cb={this.onTextChange}
                                        field={field}
                                        state={this.state} />
                                );

                            case 'radio':
                                return (
                                    <RadioFields
                                        key={field.argName}
                                        field={field}
                                        cb={this.onRadioChange}
                                        radios={field.radios} />
                                );

                            case 'checkbox':
                                return (
                                    <CheckBoxField
                                        key={field.checkbox.arg_name}
                                        field={field}
                                        cb={this.onCheckBoxChange} />
                                );
                        }
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

const mapStateToProps = state => state.search_settings;
export default withRouter(connect(mapStateToProps)(Navigation));