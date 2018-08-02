import React, {Component} from "react";
import map from "lodash/map";
import classNames from "classnames";
import actions from "../../../actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const RegionPartial = ({region, callback}) =>{
    return (
        <label htmlFor={region.type}>
            <input
                id={region.type}
                onChange={callback}
                className="regions"
                type="checkbox"
                checked={region.selected}
                value={region.type}
            />{region.name}</label>
    );
};

class Regions extends Component {

    constructor()
    {
        super();
    }

    toggleRegionList = () => {
        const { dispatch } = this.props;
        dispatch(actions.search.toggleRegionList());
    };

    regionListStyles = () => {
        return classNames({
            ['open']: this.props.is_region_list_open
        });
    };

    updateRegionSelection = ({elm, region}) => {
        const { dispatch } = this.props;

        const target = elm.target;
        let selected = target.checked;

        dispatch(actions.search.updateRegionSelection({
            ...region,
            selected
        }));
    };

    render(){
        return (
            <div>
                {'Region:'}
                <a onClick={this.toggleRegionList}>
                    {this.props.is_region_list_open?
                        <span>close</span>:
                        <span>open</span>
                    }
                </a>
                <div className={this.regionListStyles()} id="region_list">
                    {map(this.props.region_list, (region, idx)=>{
                        return (
                            <RegionPartial
                                key={`idx${idx}:${region.selected?1:0}`}
                                region={region}
                                callback={(e)=>this.updateRegionSelection({elm:e, region})} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    is_region_list_open:state.search_settings.is_region_list_open,
    region_list:state.search_settings.region_list
});
export default withRouter(connect(mapStateToProps)(Regions));