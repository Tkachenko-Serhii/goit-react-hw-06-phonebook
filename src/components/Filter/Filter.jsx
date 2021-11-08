import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import s from "./Filter.module.css";

function Filter({ stateFilter, onChangeFilter }) {
  return (
    <>
      <p className={s.text}>Find contacts by name</p>
      <input
        type='text'
        name='Find contact'
        onChange={onChangeFilter}
        value={stateFilter}
        className={s.input}
      />
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFilter: (e) => {
    return dispatch(actions.changeFilter(e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
