import { useState } from "react";
import s from "./Form.module.css";

export default function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const inputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, number);
    setName("");
    setNumber("");
    document.getElementById("form").reset();
  };

  return (
    <form id='form' onSubmit={formSubmit} className={s.form} autoComplete='off'>
      <label className={s.label}>
        <span className={s.text}>Name</span>
        <input
          type='text'
          name='name'
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={inputChange}
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
          required
          onChange={inputChange}
          className={s.input}
          value={number}
        />
      </label>
      <button type='submit' className={s.button}>
        Add contact
      </button>
    </form>
  );
}
