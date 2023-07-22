import React, { useEffect, useState } from "react";
import "./NoteLists.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNote,
  getAllNotes,
  handleChangeCheckboxList,
  handleCompanySelect,
  selectAllNotes,
  selectFilteredNotes,
  selectUniqueCompany,
  sortNotes,
  uniqueCompanies,
} from "../../features/notesSlice";

export const NoteLists = () => {
  const dispatch = useDispatch();
  const uniqueCompany = useSelector(selectUniqueCompany);
  const notes = useSelector(selectAllNotes);
  const filteredNotes = useSelector(selectFilteredNotes);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(uniqueCompanies());
  }, [notes]);

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  const showCheckboxes = () => {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      setExpanded(true);
    } else {
      checkboxes.style.display = "none";
      setExpanded(false);
    }
  };
  const sortByStatus = (e) => {
    dispatch(sortNotes(e.target.value));
    console.log(e.target.value);
  };

  // const handleChangeCheckboxList = (e) => {
  //   const { checked, name } = e.target;
  //   if (name === "selectAll") {
  //     let tempNotes = (filteredNotes.length > 0 ? filteredNotes : notes).map(
  //       (note) => {
  //         return { ...note, isSelected: checked };
  //       }
  //     );
  //     // filteredNotes.length > 0
  //     //   ? setFilteredNotes(tempNotes)
  //     //   : setNotes(tempNotes);
  //   } else {
  //     let tempNotes = (filteredNotes.length > 0 ? filteredNotes : notes).map(
  //       (note) => (note.name === name ? { ...note, isSelected: checked } : note)
  //     );
  //     // filteredNotes.length > 0
  //     //   ? setFilteredNotes(tempNotes)
  //     //   : setNotes(tempNotes);
  //   }
  // };

  return (
    <>
      <form>
        <div className="multiselect">
          <div className="selectBox" onClick={showCheckboxes}>
            <select>
              <option>Company({uniqueCompany.length})</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id="checkboxes">
            <label>
              <input
                type="checkbox"
                id="selectAllCompany"
                name="selectAll"
                onChange={(e) => dispatch(handleCompanySelect(e))}
                checked={
                  !uniqueCompany.some(
                    (note) => note?.isCompanySelected !== true
                  )
                }
              />
              Select All
            </label>
            {uniqueCompany.map((note) => (
              <label key={note.company}>
                <input
                  type="checkbox"
                  id={note.company}
                  name={note.company}
                  onChange={(e) => dispatch(handleCompanySelect(e))}
                  checked={note?.isCompanySelected || false}
                />
                {note.company}
              </label>
            ))}
          </div>
        </div>
        <div>
          <select onChange={(e) => sortByStatus(e)}>
            <option>Status</option>
            <option value="active">Active</option>
            <option value="closed">closed</option>
          </select>
        </div>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="selectAll"
                  checked={
                    !(filteredNotes.length > 0 ? filteredNotes : notes).some(
                      (note) => note?.isSelected !== true
                    )
                  }
                  onChange={(e) => dispatch(handleChangeCheckboxList(e))}
                />
              </th>
              <th>Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {(filteredNotes.length > 0 ? filteredNotes : notes).map(
              (note, key) => {
                // console.log("val:=>", val);
                return (
                  <tr key={note.id}>
                    <td>
                      <input
                        type="checkbox"
                        name={note.id}
                        id={note.id}
                        checked={note.isSelected || false}
                        onChange={(e) => dispatch(handleChangeCheckboxList(e))}
                      />
                    </td>
                    <td>{note.username}</td>
                    <td>{note.company}</td>
                    <td>{note.status}</td>

                    <td>
                      {new Date(
                        note?.lastUpdated?.nanoseconds
                      ).toLocaleDateString()}
                    </td>
                    <td>{note.notes}</td>
                    <input
                      type="button"
                      value="Delete"
                      onClick={(e) => dispatch(deleteNote(note.id))}
                    />
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
