import React, { useState } from "react";
import notesServices from "../../services/notes.services";
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

  // const sendNotes = async (inputs) => {
  //   try {
  //     const data = await notesServices.addNote(inputs);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNote(inputs));
    // sendNotes(inputs);
    console.log(inputs);
  };

  return (
    <>
      {/* <pre>{inputs}</pre> */}

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
