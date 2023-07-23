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
  selectedCompanyCount,
  sortNotes,
  uniqueCompanies,
} from "../../features/notesSlice";

export const NoteLists = () => {
  const dispatch = useDispatch();
  const uniqueCompany = useSelector(selectUniqueCompany);
  const selectedCompany = useSelector(selectedCompanyCount);
  const notes = useSelector(selectAllNotes);
  const filteredNotes = useSelector(selectFilteredNotes);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(uniqueCompanies());
  }, [dispatch, notes]);

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

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
  };

  return (
    <>
      <form>
        <div className="multiselect">
          <div className="selectBox" onClick={showCheckboxes} key="multiselect">
            <select key="selectBox">
              <option value="company" key="selectedCompanyCount">
                Company(
                {selectedCompany})
              </option>
            </select>
            <div className="overSelect" key="overSelect"></div>
          </div>
          <div className="status-list">
            <select onChange={(e) => sortByStatus(e)}>
              <option value="Status" key="Status">
                Status
              </option>
              <option value="active" key="active">
                Active
              </option>
              <option value="closed" key="closed">
                closed
              </option>
            </select>
          </div>
        </div>
        <div id="checkboxes">
          <label>
            <input
              type="checkbox"
              key="selectAllCompany"
              name="selectAll"
              onChange={(e) => dispatch(handleCompanySelect(e))}
              checked={
                !uniqueCompany.some((note) => note?.isCompanySelected !== true)
              }
            />
            Select All
          </label>
          {uniqueCompany.map((note) => (
            <label key={note.company + note.id}>
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
      </form>

      <div>
        <table key="table" id="notes-table" cellPadding="0" cellSpacing="0">
          <thead key="theader">
            <tr key="header">
              <th key="selectAllth">
                <input
                  type="checkbox"
                  name="selectAll"
                  key="selectAll"
                  checked={
                    !(filteredNotes.length > 0 ? filteredNotes : notes).some(
                      (note) => note?.isSelected !== true
                    )
                  }
                  onChange={(e) => dispatch(handleChangeCheckboxList(e))}
                />
              </th>
              <th key="Name">Name</th>
              <th key="Company">Company</th>
              <th key="Status">Status</th>
              <th key="LastUpdated">Last Updated</th>
              <th key="Notes">Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(filteredNotes.length > 0 ? filteredNotes : notes).map(
              (note, key) => {
                return (
                  <tr key={note.id + key}>
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
                        note.lastUpdated.nanoseconds
                      ).toLocaleDateString()}
                    </td>
                    <td>{note.notes}</td>
                    <td>
                      <img
                        src="./assets/images/bin-logo.png"
                        width="15"
                        height="20"
                        alt="delete"
                        key={note.id}
                        onClick={(e) => dispatch(deleteNote(note.id))}
                      />
                    </td>
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
