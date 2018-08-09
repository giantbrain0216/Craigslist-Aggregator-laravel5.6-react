import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import actions from "../../../actions";
import Regions from './regions_component';

const mapStateToProps = state => ({
    is_region_list_open:state.search_settings.is_region_list_open,
    region_list:state.search_settings.region_list
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onToggleRegionsList: (e)=> () =>{
        e.preventDefault();
        dispatch(actions.search.toggleRegionList());
    },
    onUpdateRegionSelection: ({elm, region})=> () =>{
        const target = elm.target;
        let selected = target.checked;
        dispatch(actions.search.updateRegionSelection({
            ...region,
            selected
        }));
    }
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Regions));