import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import filter from 'lodash/filter';
import actions from '../../actions/index';
import { withRouter } from 'react-router-dom';

const AreaPartial = ({area, callback}) => {
    return (
        <label key={area.partial} htmlFor={area.partial}>
            <input onClick={callback}
                   className="regions"
                   type="checkbox"
                   id={area.partial}
                   value={area.partial}
            />{`${area.name}, ${area.state}`}</label>
    );
};

class Navigation extends Component {

    constructor(){
        super();

        this.state = {
            form:{
                required:true
            }
        };

        this.toggleRegionList = this.toggleRegionList.bind(this);
        this.toggleAreaList = this.toggleAreaList.bind(this);
        this.getSelectedAreas = this.getSelectedAreas.bind(this);
        this.getTotalSelectedAreas = this.getTotalSelectedAreas.bind(this);
        this.getUnselectedAreas = this.getUnselectedAreas.bind(this);
        this.regionListStyles = this.regionListStyles.bind(this);
        this.areaListStyles = this.areaListStyles.bind(this);
        this.updateRegionSelection = this.updateRegionSelection.bind(this);
        this.updateAreaSelection = this.updateAreaSelection.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    toggleRegionList () {
        const { dispatch } = this.props;
        dispatch(actions.search.toggleRegionList());
    };

    toggleAreaList () {
        const { dispatch } = this.props;
        dispatch(actions.search.toggleAreaList());
    };

    getSelectedAreas () {
        return filter(this.props.area_list, {
            selected:true
        });
    };

    getTotalSelectedAreas () {
        return filter(this.props.area_list, {
            selected:true
        }).length;
    };

    getUnselectedAreas() {
        return filter(this.props.area_list,{
            selected:false
        });
    };

    regionListStyles() {
        return classNames({
            ['open']: this.props.is_region_list_open
        });
    };

    areaListStyles() {
        return classNames({
            ['open']: this.props.is_area_list_open
        });
    };

    updateRegionSelection (region) {
        const { dispatch } = this.props;
        dispatch(actions.search.updateRegionSelection(region));
    };

    updateAreaSelection (area) {
        const { dispatch } = this.props;
        dispatch(actions.search.updateAreaSelection(area));
    };

    submitForm (e) {
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

    componentWillMount()
    {
        // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
        const {dispatch, history} = this.props;
        dispatch(actions.search.fetchSearchSettings(this.props.site));
        history.listen(() => {
            let  {state} = history.location;
            // view new URL
            console.log('New URL', history.location);
            dispatch(actions.search.fetchSearchSettings(state.section));
        });
    }

    render() {
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
                                    <div key={fieldKey} className="text-field">
                                        <label className="fields" htmlFor={field.argId}>{field.argTitle}</label>
                                        <input className="fields" type="text" value={this.state.form[field.argName]} id={field.argId} />
                                        <br />
                                    </div>
                                );

                            case 'radio':
                                return (
                                    <div key={fieldKey} className="radio-box-field">
                                        {field.radios.map(radio=>{
                                            return (
                                                <div key={radio.arg_name_id}>
                                                    <label className="fields" htmlFor={radio.arg_name_id}>{radio.arg_name}</label>
                                                    <input className="fields" type="radio" value={radio.arg} id={radio.arg_name_id} />
                                                    <br />
                                                </div>
                                            );
                                        })}
                                    </div>
                                );

                            case 'checkbox':
                                return (
                                    <div key={fieldKey} className="checkbox-field">
                                        <label className="fields" htmlFor={field.checkbox.arg_name}>{field.checkbox.title}</label>
                                        <input className="fields" type="checkbox" value={field.checkbox.value} id={field.checkbox.arg_name} />
                                        <br />
                                    </div>
                                );
                        }
                    })}
                </div>
                <cite>{this.props.page_search_example}</cite>
                <div id="locations_container">
                    {'Region:'}
                    <a onClick={this.toggleRegionList}>
                        {this.props.is_region_list_open?
                            <span>close</span>:
                            <span>open</span>
                        }
                    </a>
                    <div className={this.regionListStyles()} id="region_list">
                        {this.props.region_list.map(region=>{
                            return (
                                <label key={region.type} htmlFor={region.type}>
                                    <input onClick={()=>this.updateRegionSelection(region)}
                                           className="regions"
                                           type="checkbox"
                                           id={region.type}
                                           value={region.type} />{region.name}</label>
                            );
                        })}
                    </div><br />
                    {'Areas:'}
                    <a onClick={this.toggleAreaList}>
                        {this.props.is_area_list_open?
                            <span>close</span>:
                            <span>open</span>
                        }
                    </a>
                    <div className={this.areaListStyles()} id="areas_list">
                        <label>Selected selected: {this.getTotalSelectedAreas()}</label>
                        {this.getSelectedAreas().map(area=>{
                            return (
                                <AreaPartial
                                    key={area.partial}
                                    area={area}
                                    callback={()=>this.updateAreaSelection(area)} />
                            );
                        })}
                        <label>Un-Selected</label>
                        {this.getUnselectedAreas().map(area=>{
                            return (
                                <AreaPartial
                                    key={area.partial}
                                    area={area}
                                    callback={()=>this.updateAreaSelection(area)} />
                            );
                        })}
                    </div>
                </div>
                <button id="search_btn" type="submit">Search</button>
            </form>
        );
    }
}

const mapStateToProps = state => state.search_settings;
export default withRouter(connect(mapStateToProps)(Navigation));