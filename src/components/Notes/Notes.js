import React from "react";
import { NoteLists } from "../NoteLists/NoteLists";
import { NoteForms } from "../NoteForms/NoteForms";
import "./Notes.css";
import { useDispatch, useSelector } from "react-redux";
import { handleModal, isModalOpen } from "../../features/notesSlice";

export const Notes = ({ notes }) => {
  const dispatch = useDispatch();
  const isModalShow = useSelector(isModalOpen);

  return (
    <div>
      <div className="header">
        <h2>Team Members</h2>
        <button id="myBtn" onClick={() => dispatch(handleModal())}>
          Add Members <span className="plus-icon">+</span>
        </button>
      </div>

      {isModalShow && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => dispatch(handleModal())}>
              &times;
            </span>
            <NoteForms />
          </div>
        </div>
      )}
      <hr />
      <NoteLists />
    </div>
  );
};
