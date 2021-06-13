import React from "react";
import "./AddToDo.css";

const AddToDo = (props) => {
  return (
    <div className="addToDo">
      <form>
        <input
          className="addToDo__input"
          onChange={(event) => props.inputChange(event.target.value)}
          value={props.input}
        />
        <button
          className="addToDo__button"
          disabled={!props.input}
          type="submit"
          onClick={(event) => props.clickAdd(event)}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddToDo;
