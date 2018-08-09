import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import Regions from './Regions';
import Areas from './Areas';
import PropTypes from "prop-types";
import FormField from './FormField';
import style from 'styled-components';

const ChangeSizeContainer = style.div`
    display: block;
`;

const LocationContainer = style.div`
  height: 250px;
  overflow: auto;
  -moz-box-shadow: 0 1px 3px #000000;
  padding: 2px;
  margin: 0px;
  margin-bottom: 10px;
`;

const FindItemForm = style.form`
  position: relative;
  top: 25px;
  left: 0px;
  width: 250px;
  background-color: #fff;
  border: solid 1px #999;
  padding: 10px;
  border-left: none;
  border-top: none;
  margin: 0px;
  box-shadow: 0px 1px 3px #000;
`;

class Navigation extends Component {

    state = {
        form:{}
    };

    constructor() {
        super();
    }

    updateFormState = (key, value) => {
        console.log('updating-state','key', key, 'value', value);
        this.props.onFormUpdateField({key,value});
    };

    onTextChangeDeBounce = debounce(({elm, key}) => {
        this.updateFormState(key, elm.target.value);
    }, 50);

    onRadioChangeDeBounce = debounce(({elm, key}) => {
        this.updateFormState(key, elm.target.value);
    }, 50);

    onCheckBoxChangeDeBounce = debounce(({elm, key}) => {
        this.updateFormState(key, elm.target.checked);
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

    render()
    {
        if(!this.props.loaded && !this.props.loading)
            return null;

        if(this.props.loading)
            return (<div>Loading...</div>);

        return (
            <FindItemForm onSubmit={this.props.onSubmitForm}>
                <ChangeSizeContainer>
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
                </ChangeSizeContainer>
                <cite>{this.props.page_search_example}</cite>
                <LocationContainer>
                    <Regions />
                    <Areas />
                </LocationContainer>
                <button type="submit">Search</button>
            </FindItemForm>
        );
    }
}

Navigation.propTypes = {
    page_title: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired,
    site: PropTypes.string.isRequired,
    page_search_example: PropTypes.string.isRequired,
    area_list: PropTypes.object.isRequired,
    region_list: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    onFormUpdateField: PropTypes.func.isRequired
};

Navigation.defaultProps = {
    loaded:false,
    loading:false,
    page_title:'',
    site:'',
    page_search_example:'',
    area_list:{},
    region_list:{},
    fields:[],
    onSubmitForm:(e)=>{e.preventDefault();},
    onFormUpdateField:(e)=>{}
};

export default Navigation;