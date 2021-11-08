import { useState } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import s from "./Form.module.css";

function Form({ onFormSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(name, number);
    setName("");
    setNumber("");
    document.getElementById("form").reset();
  };

  return (
    <form id='form' onSubmit={onSubmit} className={s.form} autoComplete='off'>
      <label className={s.label}>
        <span className={s.text}>Name</span>
        <input
          type='text'
          name='name'
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={s.input}
          value={name}
        />
      </label>
      <label className={s.label}>
        <span className={s.text}>Number</span>
        <input
          type='tel'
          name='number'
          pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
          title='Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +'
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          className={s.input}
          value={number}
          required
        />
      </label>
      <button type='submit' className={s.button}>
        Add contact
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit: (name, number) =>
    dispatch(actions.addContact({ name, number })),
});

export default connect(null, mapDispatchToProps)(Form);
