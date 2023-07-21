import React from "react";
import { NoteLists } from "../NoteLists/NoteLists";
import { NoteForms } from "../NoteForms/NoteForms";

export const Notes = ({ notes }) => {
  return (
    <div>
      <div>
        <span>Team Members</span>
        <span>Add Members+</span>
        <NoteForms />
      </div>
      <hr />
      <NoteLists />
    </div>
  );
};
