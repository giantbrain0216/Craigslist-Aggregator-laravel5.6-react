import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import AreaPartial from './AreaPartial';

class Areas extends Component {

    constructor()
    {
        super();
    }

    getSelectedAreas = () => {
        return Object.entries(this.props.area_list)
            .filter(([key, area])=>{
                return area.selected === true;
            })
            .reduce((collector, [key, area])=>{
                collector[area.partial] = area;
                return collector;
            },{});
    };

    getTotalSelectedAreas = () => {
        return Object.entries(this.props.area_list)
            .filter(([key, area])=>area.selected === true).length;
    };

    getUnselectedAreas = () => {
        return Object.entries(this.props.area_list)
            .filter(([key, area])=>{
                return area.selected !== true;
            })
            .reduce((collector, [key, area])=>{
                collector[area.partial] = area;
                return collector;
            },{});
    };

    areaListStyles = () => {
        return classNames({
            ['open']: this.props.is_area_list_open
        });
    };

    render(){
        return (
            <div>
                {'Areas:'}
                <a onClick={this.props.onToggleAreaList}>
                    {this.props.is_area_list_open?
                        <span>close</span>:
                        <span>open</span>
                    }
                </a>
            <div className={this.areaListStyles()} id="areas_list">
                    <label>Selected selected: {this.getTotalSelectedAreas()}</label>
                    {Object.entries(this.getSelectedAreas()).map(([idx, area])=>{
                        return (
                            <AreaPartial
                                key={`areaSelected:${idx}:${area.selected?1:0}`}
                                area={area}
                                callback={(e)=>this.props.onUpdateAreaSelection({elm:e,area})} />
                        );
                    })}
                    <label>Un-Selected</label>
                    {Object.entries(this.getUnselectedAreas()).map(([idx, area])=>{
                        return (
                            <AreaPartial
                                key={`areaUnSelected:${idx}:${area.selected?1:0}`}
                                area={area}
                                callback={(e)=>this.props.onUpdateAreaSelection({elm:e,area})} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

Areas.propTypes = {
    is_area_list_open: PropTypes.bool.isRequired,
    area_list: PropTypes.object.isRequired,
    onToggleAreaList: PropTypes.func.isRequired,
    onUpdateAreaSelection: PropTypes.func.isRequired,
};

Areas.defaultProps = {
    is_area_list_open:false,
    area_list:{},
    onToggleAreaList:()=>{console.log('unbound-toggle')},
    onUpdateAreaSelection:()=>{console.log('unbound-update-area-selection')},
};

export default Areas;