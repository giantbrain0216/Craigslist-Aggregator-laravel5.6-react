import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from 'styled-components';
import RegionPartial from './RegionPartial';

const RegionListContainer = styles.div`
  display: none;
  border: 1px solid gainsboro;
  
  &.open {
    display: block;
  }
`;

class Regions extends Component {

    constructor()
    {
        super();
    }

    regionListStyles = () => {
        return classNames({
            'open': this.props.is_region_list_open
        });
    };

    render(){
        return (
            <div>
                {'Region:'}
                <a onClick={this.props.onToggleRegionsList}>
                    {this.props.is_region_list_open?
                        <span>close</span>:
                        <span>open</span>
                    }
                </a>
                <RegionListContainer className={this.regionListStyles()}>
                    {Object.entries(this.props.region_list).map(([key, region])=>{
                        return (
                            <RegionPartial
                                key={`idx${key}:${region.selected?1:0}`}
                                region={region}
                                callback={(e)=>this.props.onUpdateRegionSelection({elm:e, region})} />
                        );
                    })}
                </RegionListContainer>
            </div>
        );
    }
}

Regions.propTypes = {
    is_region_list_open: PropTypes.bool.isRequired,
    region_list: PropTypes.object.isRequired,
    onToggleRegionsList: PropTypes.func.isRequired
};

Regions.defaultProps = {
    is_region_list_open:true,
    region_list:{},
    onToggleRegionsList:()=>{console.log('unbound-toggle-regions-list')}
};

export default Regions;