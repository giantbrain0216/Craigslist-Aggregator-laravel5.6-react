import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import AreaPartial from './AreaPartial';
import styles from "styled-components";

const RegionListContainer = styles.div`
  display: none;
  border: 1px solid gainsboro;
  
  &.open {
    display: block;
  }
`;

const keySelectAreas = (data, selectedState) =>{
    let area_list = Object.entries(data)
        .filter(([key, area])=>{
            return area.selected !== selectedState;
        })
        .reduce((collector, [key, area])=>{
            collector[area.partial] = area;
            return collector;
        },{});
    // console.log(area_list);
    return area_list;
};

class Areas extends Component {

    constructor()
    {
        super();
    }

    getSelectedAreas = () => {
        return keySelectAreas(this.props.area_list, true);
    };

    getTotalSelectedAreas = () => {
        return Object.entries(this.props.area_list)
            .filter(([key, area])=>area.selected === true).length;
    };

    getUnselectedAreas = () => {
        return keySelectAreas(this.props.area_list, false);
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
                <RegionListContainer className={this.areaListStyles()}>
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
                </RegionListContainer>
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