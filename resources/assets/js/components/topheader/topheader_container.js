import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopHeader from './topheader_component';
const mapStateToProps = state => state.search_settings;
export default withRouter(connect(mapStateToProps)(TopHeader));