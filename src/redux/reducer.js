import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alert } from "@pnotify/core";

import actions from "./actions";

const existingСontacts = JSON.parse(window.localStorage.getItem("contacts"));

const items = createReducer(existingСontacts || [], {
  [actions.addContact]: (state, { payload }) => {
    if (state.find((contact) => contact.name === payload.name)) {
      alert({
        type: "error",
        text: `${payload.name} is already in you contacts`,
      });
      return state;
    }
    const updateContacts = [...state, payload];
    localStorage.setItem("contacts", JSON.stringify(updateContacts));
    return updateContacts;
  },
  [actions.deleteContact]: (state, { payload }) => {
    const updateContactsAfterDelete = state.filter(({ id }) => id !== payload);
    localStorage.setItem("contacts", JSON.stringify(updateContactsAfterDelete));
    return updateContactsAfterDelete;
  },
});

const filter = createReducer("", {
  [actions.changeFilter]: (state, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
