import React, { useEffect, useState } from "react";
import "./NoteLists.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNote,
  getAllNotes,
  selectAllNotes,
} from "../../features/notesSlice";

export const NoteLists = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectAllNotes);

  const [expanded, setExpanded] = useState(false);
  const [uniqueCompany, setUniqueCompany] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(notes);

  useEffect(() => {
    const key = "company";
    const uniqueCompany = [
      ...new Map(notes.map((item) => [item[key], item])).values(),
    ];
    setUniqueCompany(uniqueCompany);
  }, [notes]);

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

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

  const handleChangeCheckboxList = (e) => {
    const { checked, name } = e.target.checked;
    if (name === "selectAll") {
      let tempUser = notes.map((note) => {
        return { ...note, isSelected: checked };
      });
      // setUsers(tempUser);
    } else {
      let tempUser = notes.map((note) =>
        note.name === name ? { ...note, isSelected: checked } : note
      );
      // setUsers(tempUser);
    }
  };

  const handleChange = (e) => {
    const checked = e.target.checked;
    const selectedCategory = e.target.name;

    if (selectedCategory === "selectAll") {
      let tempUser = uniqueCompany.map((company) => {
        return { ...company, isCompanySelected: checked };
      });
      setUniqueCompany(tempUser);

      if (checked) {
        setSelectedFilters(uniqueCompany.map((note) => note.company));
      } else {
        setSelectedFilters([]);
      }
    } else {
      let tempUser = uniqueCompany.map((company) =>
        company.company === selectedCategory
          ? { ...company, isCompanySelected: checked }
          : company
      );
      setUniqueCompany(tempUser);

      if (selectedFilters.includes(selectedCategory)) {
        let filters = selectedFilters.filter((el) => el !== selectedCategory);
        setSelectedFilters(filters);
      } else {
        setSelectedFilters([...selectedFilters, selectedCategory]);
      }
    }
    console.log(selectedFilters);
  };

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = notes.filter((note) => note.company === selectedCategory);
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...notes]);
    }
    console.log(filteredItems);
  };

  return (
    <>
      <form>
        <div className="multiselect">
          <div className="selectBox" onClick={showCheckboxes}>
            <select>
              <option>Company({notes.length})</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id="checkboxes">
            <label>
              <input
                type="checkbox"
                id="selectAllCompany"
                name="selectAll"
                onChange={handleChange}
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
                  onChange={handleChange}
                  checked={note?.isCompanySelected || false}
                />
                {note.company}
              </label>
            ))}
          </div>
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
                  checked={!notes.some((note) => note?.isSelected !== true)}
                  onChange={handleChangeCheckboxList}
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
            {notes.map((note, key) => {
              // console.log("val:=>", val);
              return (
                <tr key={note.id}>
                  <td>
                    <input
                      type="checkbox"
                      name={note.company}
                      id={note.id}
                      checked={note.isSelected || false}
                      onChange={handleChangeCheckboxList}
                    />
                  </td>
                  <td>{note.username}</td>
                  <td>{note.company}</td>
                  <td>{note.status}</td>
                  <td>{note.lastUpdated}</td>
                  <td>{note.notes}</td>
                  <input
                    type="button"
                    value="Delete"
                    onClick={(e) => dispatch(deleteNote(note.id))}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
