import { connect } from 'react-redux';
import SomeComponent from './some_component';

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(SomeComponent);
