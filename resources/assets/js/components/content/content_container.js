import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Content from './content_component';
const mapStateToProps = state => state.locations;
export default withRouter(connect(mapStateToProps)(Content));