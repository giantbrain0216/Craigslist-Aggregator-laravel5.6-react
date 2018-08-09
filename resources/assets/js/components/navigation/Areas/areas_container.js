import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Areas from './areas_component';
import {bindActionCreators} from "redux";
import actions from "../../../actions";

const mapStateToProps = state => ({
    is_area_list_open:state.search_settings.is_area_list_open,
    area_list:state.search_settings.area_list
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onToggleAreaList: (e)=> () =>{
        e.preventDefault();
        dispatch(actions.search.toggleAreaList());
    },
    onUpdateAreaSelection: ({elm, area})=> () =>{
        const target = elm.target;
        let selected = target.checked;
        dispatch(actions.search.updateAreaSelection({
            ...area,
            selected
        }));
    }
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Areas));