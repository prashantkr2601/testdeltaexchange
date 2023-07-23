import React from "react";
import { NoteLists } from "../NoteLists/NoteLists";
import { NoteForms } from "../NoteForms/NoteForms";
import "./Notes.css";

export const Notes = ({ notes }) => {
  var modal = document.getElementById("myModal");
  const showDialouge = () => {
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  return (
    <div>
      <div className="header">
        <h2>Team Members</h2>
        <button id="myBtn" onClick={showDialouge}>
          Add Members <span className="plus-icon">+</span>
        </button>
      </div>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <NoteForms />
        </div>
      </div>
      <hr />
      <NoteLists />
    </div>
  );
};
