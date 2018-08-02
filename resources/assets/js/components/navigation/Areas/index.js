import React, {Component} from "react";
import map from "lodash/map";
import filter from "lodash/filter";
import classNames from "classnames";
import actions from "../../../actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const AreaPartial = ({area, callback}) => {
    return (
        <label htmlFor={area.partial}>
            <input
                id={area.partial}
                onChange={callback}
                className="regions"
                type="checkbox"
                checked={area.selected}
                value={area.partial}
            />{`${area.name}, ${area.state}`}</label>
    );
};

class Areas extends Component {

    constructor()
    {
        super();
    }

    toggleAreaList = () => {
        const { dispatch } = this.props;
        dispatch(actions.search.toggleAreaList());
    };

    getSelectedAreas = () => {
        return filter(this.props.area_list, (area)=>area.selected === true);
    };

    getTotalSelectedAreas = () => {
        let selected = filter(this.props.area_list, (area)=>area.selected === true);
        return Object.keys(selected).length;
    };

    getUnselectedAreas = () => {
        return filter(this.props.area_list, (area)=>area.selected !== true);
    };

    areaListStyles = () => {
        return classNames({
            ['open']: this.props.is_area_list_open
        });
    };

    updateAreaSelection ({elm, area}) {
        const { dispatch } = this.props;
        const target = elm.target;
        let selected = target.checked;
        dispatch(actions.search.updateAreaSelection({
            ...area,
            selected
        }));
    }

    render(){
        return (
            <div>
                {'Areas:'}
                <a onClick={this.toggleAreaList}>
                    {this.props.is_area_list_open?
                        <span>close</span>:
                        <span>open</span>
                    }
                </a>
                <div className={this.areaListStyles()} id="areas_list">
                    <label>Selected selected: {this.getTotalSelectedAreas()}</label>
                    {map(this.getSelectedAreas(), (area, idx)=>{
                        return (
                            <AreaPartial
                                key={`areaSelected:${idx}:${area.selected?1:0}`}
                                area={area}
                                callback={(e)=>this.updateAreaSelection({elm:e,area})} />
                        );
                    })}
                    <label>Un-Selected</label>
                    {map(this.getUnselectedAreas(), (area, idx)=>{
                        return (
                            <AreaPartial
                                key={`areaUnSelected:${idx}:${area.selected?1:0}`}
                                area={area}
                                callback={(e)=>this.updateAreaSelection({elm:e,area})} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    is_area_list_open:state.search_settings.is_area_list_open,
    area_list:state.search_settings.area_list
});
export default withRouter(connect(mapStateToProps)(Areas));