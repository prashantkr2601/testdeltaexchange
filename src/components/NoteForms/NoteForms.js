import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../features/notesSlice";

export const NoteForms = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNote({ ...inputs, lastUpdated: new Date() }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={inputs.company || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={inputs.status || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Notes:
          <input
            type="text"
            name="notes"
            value={inputs.notes || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Save" />
        <input type="button" value="Cancel" />
      </form>
    </>
  );
};
