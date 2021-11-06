import { useState, useMemo } from "react";
import useLocalStorage from "./hooks/localStorage";
import Form from "./components/Form";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import shortId from "shortid";

export default function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [filter, setFilter] = useState("");

  const getFormData = (name, number) => {
    if (contacts.find((contact) => contact.name === name)) {
      alert(name + " is already in contacts");
      return;
    }
    const contact = { name, number, id: shortId.generate() };
    setContacts([contact, ...contacts]);
  };

  const stateFilter = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter)
    );
  }, [contacts, filter]);

  const onContactDel = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className='container'>
      <div className='addForm'>
        <h2 className='title'>Phonebook</h2>
        <Form onSubmit={getFormData} />
      </div>
      <h2 className='title'>Contacts</h2>
      <Filter
        stateFilter={filter}
        onChangeFilter={(data) => setFilter(data.toLowerCase())}
      />
      <ContactList contacts={stateFilter} onContactDel={onContactDel} />
    </div>
  );
}
