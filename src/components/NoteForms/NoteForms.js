import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../features/notesSlice";
import "./NoteForms.css";

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
        <div className="form-container">
          <h4>Add Member</h4>
          <label>Name</label>
          <input
            type="text"
            name="username"
            id="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />

          <label>Company</label>
          <input
            type="text"
            name="company"
            value={inputs.company || ""}
            onChange={handleChange}
          />

          <label>Status</label>
          <input
            type="text"
            name="status"
            value={inputs.status || ""}
            onChange={handleChange}
          />

          <label>Notes</label>
          <input
            type="text"
            name="notes"
            value={inputs.notes || ""}
            onChange={handleChange}
          />
        </div>
        <div className="btn-group">
          <input className="cancel-btn" type="button" value="Cancel" />
          <input className="save-btn" type="submit" value="Save" />
        </div>
      </form>
    </>
  );
};
