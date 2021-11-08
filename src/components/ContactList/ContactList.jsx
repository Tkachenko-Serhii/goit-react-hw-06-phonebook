import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import ContactItem from "./ContactItem";

function ContactList({ contacts, onContactDel }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onContactDel={onContactDel}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

const filteredContacts = (contacts, filter) =>
  contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

const mapStateToProps = ({ contacts }) => ({
  contacts: filteredContacts(contacts.items, contacts.filter),
});

const mapDispatchToProps = (dispatch) => ({
  onContactDel: (id) => dispatch(actions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
